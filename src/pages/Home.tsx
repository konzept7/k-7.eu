import { Space, Stack, Title, Image, Group, createStyles, Center, Button } from "@mantine/core";
import logo from "./../assets/logo/logo_flat_white_transparent.svg"
import References from "../components/Shared/References";
import ContactSection from "../components/Shared/ContactSection";
import WhoWeAre from "../components/Shared/WhoWeAre";
import ServiceCollection from "./ServiceCollection";
import { useScrollIntoView } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: '2.8rem',
    fontWeight: 900,
    textUnderlineOffset: "-0.2em",
    textDecorationLine: "underline",
    textDecorationThickness: "0.15em",
    textUnderlinePosition: "under",
    textDecorationSkipInk: "none",
    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
    textDecorationColor: theme.colors.brand[6],
    textAlign: "left",
    marginTop: 50,
    marginBottom: 50,
    textShadow: "-2px -2px 4px rgba(0, 0, 0, 1),2px 2px 4px rgba(0,0,0, 1);",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.8rem',
    },
  },
  subTitle: {
    lineHeight: 1.2,
    fontFamily: 'Krub, sans-serif',
    fontSize: "1.9rem",
    fontWeight: 200,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.4rem',
    },
  },
  contactButton: {
    backgroundColor: theme.white,
    color: theme.black,
    borderColor: theme.colors.brand[4] + ' !important',
    borderBottom: "0.45em solid",
    borderRadius: theme.radius.md,
    borderLeft: "0.125em solid",
    borderRight: "0.125em solid",
    borderTop: "0.125em solid",
    '&:hover': {
      backgroundColor: theme.colors.brand[2] + ' !important'
    },
  },
  actionButton: {
    backgroundColor: theme.colors.brand[6],
    color: theme.white,
    borderColor: theme.colors.brand[4] + ' !important',
    borderBottom: "0.45em solid",
    borderRadius: theme.radius.md,
    borderLeft: "0.125em solid",
    borderRight: "0.125em solid",
    borderTop: "0.125em solid",
    '&:hover': {
      backgroundColor: theme.colors.brand[8] + ' !important'
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ duration: 350 });
  const { t } = useTranslation();




  return (
    <Stack w="100%">
      <Center style={{ minHeight: '70vh' }}>
        <Stack align="center" justify="center" spacing={30}>
          <Title ta="center" className={classes.title}>{t('home.claim')}</Title>
          <Title ta="center" className={classes.subTitle} px={40}>
            {t('home.description')}
          </Title>
          <Group position="center" m="auto" spacing={30} my="xl">
            <Image src={logo} height={60} fit="scale-down" />
            {/* <Button size="xl" className={classes.contactButton}>Kontakt aufnehmen</Button> */}
            <Button onClick={() => { scrollIntoView({ alignment: 'center' }) }} size="xl" className={classes.actionButton}>{t('home.contactUs')}</Button>
          </Group>
          <References />
        </Stack>
      </Center>
      <WhoWeAre />
      <ServiceCollection />
      <Title ta="center" className={classes.title} ref={targetRef}>{t('home.contactUs')}</Title>
      <ContactSection />
      <Space h={50} />
    </Stack>
  )
}

