import { ContentFragment } from "../../utils/queryCms";
import CodeblockFragment from "./CodeblockFragment";
import DidYouKnowFragment from "./DidYouKnowFragment";
import IlluminatingSectionFragment from "./IlluminatingSectionFragment";
import ImageFragment from "./ImageFragment";
import ParagraphFragment from "./ParagraphFragment";
import QuoteFragment from "./QuoteFragment";
import SingleFeatureCardFragment from "./SingleFeatureCardFragment";
import SplitFeatureCardFragment from "./SplitFeatureCardFragment";


export default function Fragment(fragment: ContentFragment) {

  const key = `${fragment.__component ?? ''}-${fragment.id}`
  switch (fragment.__component) {
    case "content-components.image":
      return <ImageFragment key={key} {...fragment} />
    case "content-fragments.section":
    case "content-fragments.paragraph":
      return <ParagraphFragment key={key} {...fragment} />
    case "content-fragments.quote":
      return <QuoteFragment key={key} {...fragment} />
    case "content-fragments.codeblock":
      return <CodeblockFragment key={key} {...fragment} />
    case "content-fragments.illuminating-section":
      return <IlluminatingSectionFragment key={key} {...fragment} />
    case "content-fragments.did-you-know":
      return <DidYouKnowFragment key={key} {...fragment} />
    case "content-fragments.split-feature-card":
      return <SplitFeatureCardFragment key={key} {...fragment} />
    case "content-fragments.fact-card":
      return <SingleFeatureCardFragment key={key} {...fragment} />
    default: return null
  }

}