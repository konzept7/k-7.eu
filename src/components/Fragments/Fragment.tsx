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

  switch (fragment.__component) {
    case "content-components.image":
      return <ImageFragment key={fragment.id} {...fragment} />
    case "content-fragments.section":
    case "content-fragments.paragraph":
      return <ParagraphFragment key={fragment.id} {...fragment} />
    case "content-fragments.quote":
      return <QuoteFragment key={fragment.id} {...fragment} />
    case "content-fragments.codeblock":
      return <CodeblockFragment key={fragment.id} {...fragment} />
    case "content-fragments.illuminating-section":
      return <IlluminatingSectionFragment key={fragment.id} {...fragment} />
    case "content-fragments.did-you-know":
      return <DidYouKnowFragment key={fragment.id} {...fragment} />
    case "content-fragments.split-feature-card":
      return <SplitFeatureCardFragment key={fragment.id} {...fragment} />
    case "content-fragments.single-feature-card":
      return <SingleFeatureCardFragment key={fragment.id} {...fragment} />
    default: return null
  }

}