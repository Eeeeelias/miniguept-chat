import MinigueBgi from "./minigue-bgi.webp"
import Minigue from "./minigue.webp"
import Rick from "./rick.webp"

interface Bot {
  name: string
  avatar: string
  url: string
}

const baseApiUrl = "http://localhost:7722"

export const bots: Bot[] = [
  {
    name: "minigue-bgi",
    avatar: MinigueBgi,
    url: `${baseApiUrl}/minigue-bgi`,
  },
  {
    name: "minigue",
    avatar: Minigue,
    url: `${baseApiUrl}/minigue`,
  },
  {
    name: "rick",
    avatar: Rick,
    url: `${baseApiUrl}/rick`,
  },
]
