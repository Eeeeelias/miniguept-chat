import csv

small_set = []

with open('data/convos.csv', 'r') as f:
    for i in range(200000):
        line = f.readline()[:-1]
        line = line.split(",")
        small_set.append(line)
        if "sth" in f.readline():
            print(f.readline())

print(small_set[:5])

f = open('data/small_convo.csv', 'w')
csv = csv.writer(f, delimiter='\t')
csv.writerows(small_set)

