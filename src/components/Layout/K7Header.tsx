import { useEffect, useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Image, Menu, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandFacebook, IconBrandGithub, IconLanguage } from '@tabler/icons';
import Logo from '../../assets/logo/logo_flat_white_transparent.svg'
import LogoWithoutText from '../../assets/logo/logo_flat_white_k7_transparent.svg'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DepartmentResponseItem, getDepartments } from '../../utils/queryCms';

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: '0px',
    backgroundColor: 'transparent',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 76,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 320,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export default function HeaderMiddle({ links }: HeaderMiddleProps) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { t, i18n } = useTranslation();
  const [departments, setDepartments] = useState<DepartmentResponseItem[]>([]);
  let location = useLocation();
  const mediumDisplay = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    const split = location.pathname.split('/');
    if (split.length === 1) {
      setActive('home')
      return
    }
    const route = split[1];
    setActive(route);
  }, [location]);

  useEffect(() => {
    getDepartments([], i18n.resolvedLanguage).then((res) => {
      setDepartments(res.filter(d => !d.attributes.hidden));
    })
  }, [i18n.language])

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
    >
      {link.label}
    </Link>
  ));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  };

  return (
    <Header height={56} className={classes.header}>
      <Container className={classes.inner}>
        <Menu onChange={(o) => setOpened(o)}>
          <Menu.Target>
            <Burger opened={opened} onClick={() => setOpened(o => !o)} size="sm" className={classes.burger} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} to="/projects">{t('projects.projects')}</Menu.Item>
            <Menu.Divider />
            <Menu.Item component={Link} to="/news">{t('news')}</Menu.Item>
            <Menu.Divider />
            <Menu.Label>{t('services.services')}</Menu.Label>
            {departments.map((department) => (
              <Menu.Item key={department.id} component={Link} to={`/services/${department.attributes.route}`}>
                {department.attributes.name}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <Group className={classes.links} spacing={5}>
          {items}
          <Menu>
            <Menu.Target>
              <Text className={cx(classes.link, { [classes.linkActive]: active === "services" })}>{t('services.services')}</Text>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{t('services.services')}</Menu.Label>
              {departments.map((department) => (
                <Menu.Item key={department.id} component={Link} to={`/services/${department.attributes.route}`}>
                  {department.attributes.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Link to="/">
          <Image src={mediumDisplay ? LogoWithoutText : Logo} height={34} width={28} />
        </Link>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <Menu trigger="hover" openDelay={50} closeDelay={300}>
            <Menu.Target>
              <ActionIcon size="lg">
                <IconLanguage size={18} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{t('header.changeLanguage')}</Menu.Label>
              <Menu.Item onClick={() => changeLanguage("de")}>Deutsch</Menu.Item>
              <Menu.Item onClick={() => changeLanguage("en")}>English</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ActionIcon size="lg" component='a' href="https://github.com/konzept7/">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}