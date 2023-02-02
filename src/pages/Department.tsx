import { Center, Loader, Stack, Title, createStyles, Text, Group, Image, Accordion, ThemeIcon, Space, SimpleGrid, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "../components/Article/ArticleCard";
import Fragment from "../components/Fragments/Fragment";
import K7Page from "../components/Layout/K7Page";
import SkillCard from "../components/Shared/SkillCard";
import { DepartmentResponseItem, getDepartmentByRoute } from "../utils/queryCms";

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 900,
    textUnderlineOffset: "-0.2em",
    textDecorationLine: "underline",
    textDecorationThickness: "0.15em",
    textUnderlinePosition: "under",
    textDecorationSkipInk: "none",
    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
    textDecorationColor: theme.colors.brand[6],
    textAlign: "left",
    marginTop: 20,
    textShadow: "-2px -2px 4px rgba(0, 0, 0, 1),2px 2px 4px rgba(0,0,0, 1);",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.6rem',
    },
  },
  subTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: '0.5rem',
    align: "center", [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: '0.5rem',
    },
  },
  image: {
    flex: 1,
    display: "inline",
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
}));

export default function Department() {
  const { name } = useParams()
  const { t, i18n } = useTranslation();
  const [department, setDepartment] = useState<DepartmentResponseItem | undefined>(undefined)
  const { classes, theme } = useStyles();

  useEffect(() => {
    getDepartmentByRoute(name ?? 'design', i18n.resolvedLanguage).then(d => {
      setDepartment(d)
    }
    ).catch((error: any) => {
      console.error(error)
      showNotification({
        title: t('department.errorLoadingTitle'),
        color: "red",
        message: t('department.errorLoadingMessage')
      })
    }
    )
  }, [name, i18n.language])

  if (!department) {
    return (
      <K7Page background={"dark"}>
        <Center>
          <Loader>
            {t('department.loading')}
          </Loader>
        </Center>
      </K7Page>
    )
  }

  return (
    <Stack>
      <K7Page background={"dark"} py={10}>
        <Stack>
          <Group position="left">
            <IconArrowLeft />
            <Link to="/services">{t('department.allServices')}</Link>
          </Group>
          <Title ta="center" className={classes.title}>{department.attributes.name}</Title>
          <Paper className={classes.subTitle}>
            <Image alt={department.attributes?.cover?.data?.attributes?.alternativeText} width={350} src={import.meta.env.VITE_CMS + department.attributes?.cover?.data?.attributes?.url} className={classes.image} />
            <Center>
              <Text italic size="xl" color={theme.white}>{department.attributes.catchphrase}</Text>
            </Center>
          </Paper>
        </Stack>
      </K7Page>
      {
        department.attributes.body &&
        department.attributes.body.map((fragment) => {
          return (
            <Fragment key={fragment.id} {...fragment} />
          )
        })

      }
      <K7Page background="dark"><Stack>
        {department.attributes.projects?.data && department.attributes.projects?.data.length > 0 && (<>
          <Title className={classes.title} order={3}>{t('projects.projects')}</Title>
          <Text color="dimmed">{t('department.projectSelection')}</Text>
          <SimpleGrid cols={2} breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'md' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}>
            {department.attributes.projects?.data?.map((project) => {
              return (
                <ArticleCard key={project.id} type='projects' data={project} />
              )
            }
            )}
          </SimpleGrid></>)}
        {department.attributes.skills?.data && department.attributes.skills.data.length > 0 &&
          (<Accordion variant="default" radius="md" my={20}>
            <Title className={classes.title} order={3}>{t('department.skills')}</Title>
            <Text color="dimmed">
              S{t('department.lookingFor')}
            </Text>
            <Space h={30} />
            {department.attributes.skills?.data?.map((skill) => {
              return (
                <Accordion.Item key={skill.id} value={skill.id!.toString()}>
                  <Accordion.Control icon={
                    <ThemeIcon variant="filled" color="cyan" radius="sm" size="lg" >
                      <Image src={import.meta.env.VITE_CMS + skill.attributes?.icon?.data?.attributes?.url} width={26} />
                    </ThemeIcon>}><Text fw={700} size="lg" color={theme.white}>{skill.attributes?.title}</Text></Accordion.Control>
                  <Accordion.Panel>
                    <SkillCard key={skill.id} {...skill.attributes!} />
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}</Accordion>)
        }
      </Stack></K7Page>

    </Stack>
  )
}