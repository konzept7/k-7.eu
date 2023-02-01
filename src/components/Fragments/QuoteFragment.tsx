import { Blockquote } from "@mantine/core";
import { ContentFragmentsQuote } from "../../utils/queryCms";

export default function QuoteFragment(fragment: ContentFragmentsQuote) {
  return (
    <Blockquote cite={fragment.author}>
      {fragment.quote}
    </Blockquote>
  )
}