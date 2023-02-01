import { Text, Image, Center, createStyles, Stack, Title, SimpleGrid, Group, Box, ThemeIcon, Container, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import cloudCoding from "./../../assets/illustrations/cloud-coding.svg"
import customerSatisfaction from "./../../assets/illustrations/customer-satisfaction.svg"
import accountProtected from "./../../assets/illustrations/account-protected.svg"
import cuteSurprise from "./../../assets/illustrations/cute-surprise.svg"
import K7Page from "../Layout/K7Page";
import { useTranslation } from "react-i18next";


const ICON_SIZE = 60;
const useStyles = createStyles((theme) => ({
  beforeTitle: {
    textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: theme.black
  },
  itemTitle: {
    textTransform: "uppercase",
    fontSize: "1.0rem",
    color: theme.fn.darken(theme.black, 0.2),
    fontWeight: 600,
  },
  iconBox: {
    boxShadow: '0 0 0 1px #000,0 30px 30px rgba(0,0,0,.07),0 15px 15px rgba(0,0,0,.06),0 10px 8px rgba(0,0,0,.05),0 4px 4px rgba(0,0,0,.04),0 2px 2px rgba(0,0,0,.03)',
    background: theme.fn.lighten(theme.colors.brand[9], 0.05),
    borderRadius: theme.radius.md,
    ['&:hover']: {
      background: theme.fn.lighten(theme.colors.brand[9], 0.08),
    }
  },
  itemText: {
    lineHeight: 1.3,
    color: theme.black
  },
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.brand[1] : theme.colors.brand[9],
    // apply some box shadow to the wrapper allow transition from container above
    boxShadow: `inset 0px 11px 18px -10px ${theme.colors.brand[9]}, inset 0px -11px 18px -10px ${theme.colors.brand[9]}`,
  }
}));

export default function WhoWeAre() {
  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <K7Page background="light">
      <Text ta="center" className={classes.beforeTitle}>{t('wwa.subTitle')}</Text>
      <Title order={1} ta="center" color="dark" >{t('wwa.title')}</Title>
      <Text size="lg" ta="center" px={40} color="dark">
        {t('wwa.text')}
      </Text>
      <Center my={15}>
        <SimpleGrid cols={2} px={10} spacing="xl" maw={950} breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}>
          <Group noWrap>
            <Container className={classes.iconBox} color="brand" size={ICON_SIZE + 20} p={10}>
              <Image src={customerSatisfaction} alt="Account protected" w={ICON_SIZE} h={ICON_SIZE} />
            </Container>
            <Stack spacing={0}>
              <Text className={classes.itemTitle}>{t('wwa.customerObsessed')}</Text>
              <Text className={classes.itemText}>
                {t('wwa.customerText')}
              </Text>
            </Stack>
          </Group>
          <Group noWrap>
            <Container className={classes.iconBox} color="brand" size={ICON_SIZE + 20} p={10}>
              <Image src={cloudCoding} alt="Account protected" w={ICON_SIZE} h={ICON_SIZE} />
            </Container>
            <Stack spacing={0}>
              <Text className={classes.itemTitle}>{t('wwa.software-driven')}</Text>
              <Text className={classes.itemText}>
                {t('wwa.softwareText')}
              </Text>
            </Stack>
          </Group>
          <Group noWrap>
            <Container className={classes.iconBox} color="brand" size={ICON_SIZE + 20} p={10}>
              <Image src={accountProtected} alt="Account protected" w={ICON_SIZE} h={ICON_SIZE} />
            </Container>
            <Stack spacing={0}>
              <Text className={classes.itemTitle}>{t('wwa.dataSecurity')}</Text>
              <Text className={classes.itemText}>
                {t('wwa.dataSecurityText')}
              </Text>
            </Stack>
          </Group>
          <Group noWrap>
            <Container className={classes.iconBox} color="brand" size={ICON_SIZE + 20} p={10}>
              <Image src={cuteSurprise} alt="Account protected" w={ICON_SIZE} h={ICON_SIZE} />
            </Container>
            <Stack spacing={0}>
              <Text className={classes.itemTitle}>{t('wwa.interdisciplinary')}</Text>
              <Text className={classes.itemText}>
                {t('wwa.interdisciplinaryText')}
              </Text>
            </Stack>
          </Group>
        </SimpleGrid>
      </Center>
    </K7Page>
  )
}