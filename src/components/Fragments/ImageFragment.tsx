import { ContentComponentsImage } from "../../utils/queryCms";
import { Image } from "@mantine/core";

const widths = {
  "small": 250,
  "medium": 330,
  "large": "100%",
}
export default function ImageFragment(fragment: ContentComponentsImage) {
  const imageSize: "small" | "medium" | "large" = fragment.renderSize ?? "medium"
  const url = fragment.image?.data?.attributes?.formats?.large?.url ?? fragment.image?.data?.attributes?.url
  return (<Image key={fragment.id} radius="md"
    withPlaceholder
    maw="100%"
    src={import.meta.env.VITE_CMS + url}
    width={widths[imageSize]}
    alt={fragment.caption}
    caption={fragment.caption}
    mx="auto"
  />)
}