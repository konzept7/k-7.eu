import { Stack, Title, Text, ActionIcon, Group, useMantineTheme, CopyButton, Tooltip, Divider } from "@mantine/core";
import { IconCheck, IconClipboard } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import K7Page from "../components/Layout/K7Page";
import ContactSection from "../components/Shared/ContactSection";

const address = ["K7-Konzept Karlsruhe GmbH", "Roonstraße 23a", "76137 Karlsruhe", "GERMANY"]
const registrar = ["Amtsgericht Mannheim", "HRB 746032", "Geschäftsführung: Jannik Stuart | Norbert Stefan Fischer", "USt-IdNr.: DE358640588", "DUNS Nummer: 344448617"]

export default function Imprint() {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  return (
    <K7Page background="dark">
      <Stack spacing={theme.spacing.xl}>
        <Title order={1}>{t('imprint')}</Title>
        <Title order={3}>{t('contact.adress')}</Title>
        <Group position="left" align="center">
          <CopyButton value={address.join("\n")} timeout={5000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Kopiert' : 'In die Zwischenablage'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} pb={theme.spacing.sm}>
                  {copied ? <IconCheck size={24} /> : <IconClipboard size={24} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingLeft: theme.spacing.md }}>
            {address.map((line, i) => { return (<li key={i}>{line}</li>) })}
          </ul>
        </Group>
        <Title order={3}>{t('imprintPage.register')}</Title>
        <Group position="left" align="center">
          <CopyButton value={registrar.join("\n")} timeout={5000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? t('copied') : t('copy')} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy} pb={theme.spacing.sm}>
                  {copied ? <IconCheck size={24} /> : <IconClipboard size={24} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, paddingLeft: theme.spacing.md }}>
            {registrar.map((line, i) => { return (<li key={i}>{line}</li>) })}
          </ul>
        </Group>
        <Title order={3}>{t('imprintPage.responsible')}</Title>
        <Text size="md">Frank Bielecke, K7-Konzept Karlsruhe GmbH</Text>
        <Title order={3}>{t('imprintPage.disclaimerTitle')}</Title>
        <Text size="md">
          <p>{t('disclaimer')}
          </p>
          <p>
            {t('imprintPage.changesPossible')}
          </p>
          <p>
            {t('imprintPage.noClaims')}
          </p>
        </Text>
        <Divider label="Kontakt" />
        <ContactSection />
      </Stack>
    </K7Page>
  )
}