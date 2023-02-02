import { Image, Title, createStyles, Group, Text, Stack, SimpleGrid, Badge, Space } from "@mantine/core";
import K7Page from "../components/Layout/K7Page";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { DepartmentResponseItem, getDepartments } from "../utils/queryCms";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: '2.3rem',
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
  serviceCard: {
    backgroundColor: theme.colors.brand[8],
    borderColor: theme.colors.brand[4] + ' !important',
    borderBottom: "0.45em solid",
    borderRadius: theme.radius.md,
    borderLeft: "0.125em solid",
    height: 'auto',
    borderRight: "0.125em solid",
    borderTop: "0.125em solid",
    transition: "all 0.15s ease",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: theme.colors.brand[9] + ' !important',
    },
  },
  dark: { '&:hover': { borderColor: theme.colors.dark[6] + ' !important', }, },
  gray: { '&:hover': { borderColor: theme.colors.gray[6] + ' !important', }, },
  pink: { '&:hover': { borderColor: theme.colors.pink[6] + ' !important', }, },
  violet: { '&:hover': { borderColor: theme.colors.violet[6] + ' !important', }, },
  indigo: { '&:hover': { borderColor: theme.colors.indigo[6] + ' !important', }, },
  green: { '&:hover': { borderColor: theme.colors.green[6] + ' !important', }, },
  lime: { '&:hover': { borderColor: theme.colors.lime[6] + ' !important', }, },
  yellow: { '&:hover': { borderColor: theme.colors.yellow[6] + ' !important', }, },
  orange: { '&:hover': { borderColor: theme.colors.orange[6] + ' !important', }, },
  teal: { '&:hover': { borderColor: theme.colors.teal[6] + ' !important', }, },
  blue: { '&:hover': { borderColor: theme.colors.blue[6] + ' !important', }, },
  cyan: { '&:hover': { borderColor: theme.colors.cyan[6] + ' !important', }, },
  red: { '&:hover': { borderColor: theme.colors.red[6] + ' !important', }, },
  grape: { '&:hover': { borderColor: theme.colors.grape[6] + ' !important', }, },
}));

export default function ServiceCollection() {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [departments, setDepartments] = useState<DepartmentResponseItem[]>([]);

  useEffect(() => {
    getDepartments(["icon"], i18n.resolvedLanguage).then((res) => {
      setDepartments(res);
    })
  }, [i18n.language])

  return (
    <K7Page background="dark" py={20}>
      <Stack>
        <Title ta="center" className={classes.title}>{t('wwa.ourServices')}</Title>
        <Text color="dimmed" ta="center">
          {t('services.text')}
        </Text>
        <Space h="xl" />
        <SimpleGrid cols={3} px={10} spacing={50} breakpoints={[{ maxWidth: theme.breakpoints.md, cols: 2, spacing: 30 },
        { maxWidth: theme.breakpoints.sm, cols: 1, spacing: 15 }]}>
          {departments.map((item) => (
            <Stack key={item.id} spacing={theme.spacing.xs} onClick={() => { navigate("/services/" + item.attributes.route) }} h="auto" className={cx(classes.serviceCard,
              // @ts-ignore
              classes[item.attributes.color])}>
              <Image src={import.meta.env.VITE_CMS + item.attributes.icon?.data?.attributes?.url} alt={item.attributes.icon?.data?.attributes?.alternativeText} mt="xl" m="auto" width={80} />
              <Text fw={700} size="lg" mb={theme.spacing.sm} ta="center" style={{ textTransform: 'uppercase' }}>{item.attributes.name}</Text>
              <Stack justify="space-between" style={{ backgroundColor: theme.colors.brand[2], color: theme.black, height: '100%', padding: 10 }}>
                <Text ta="left" fw={500}>{item.attributes.catchphrase}</Text>
                <Group spacing={3} position="right" align="flex-end" >
                  {item.attributes.tags.split(",").map(t => (<Badge key={t} radius="sm" variant="outline" color="brand">{t}</Badge>))}
                </Group>
              </Stack>
            </Stack>
          )
          )}
        </SimpleGrid>
      </Stack>
    </K7Page >
  );
}