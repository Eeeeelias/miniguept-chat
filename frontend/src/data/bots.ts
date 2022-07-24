import assets from "../assets"

interface Bot {
  name: string
  avatar: string
  url: string
}

const baseApiUrl = "http://localhost:7722"

export const bots: Bot[] = [
  {
    name: "minigue-bgi",
    avatar: assets.minigueBgi,
    url: `${baseApiUrl}/minigue-bgi`,
  },
  {
    name: "minigue",
    avatar: assets.minigue,
    url: `${baseApiUrl}/minigue`,
  },
  {
    name: "rick",
    avatar: assets.rick,
    url: `${baseApiUrl}/rick`,
  },
]
