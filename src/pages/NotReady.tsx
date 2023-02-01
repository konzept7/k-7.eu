import { Image, Text, Stack, Title, Center } from "@mantine/core";
import K7Page from "../components/Layout/K7Page";
import working from "../assets/illustrations/working.svg"
import { useTranslation } from "react-i18next";

interface NotReadyProps {
  text?: string | undefined | null;
}

export default function NotReady({ text }: NotReadyProps) {
  const { t } = useTranslation();

  const content = text ?? t('notReadySorry')
  return (
    <K7Page background="dark">
      <Stack align="center">
        <Title order={1} mb={30}>{t('notReady')}</Title>
        <Image maw={400} src={working} alt="working" />
        <Text size="lg">
          {content}
        </Text>
      </Stack>
    </K7Page>
  );
}