import { Text, createStyles, Center, Stack, Group, Image, Box } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import audi_l from "../../assets/ref/audi.svg"
import aumann_l from "../../assets/ref/aumann-ag-logo.svg"
import bmw_l from "../../assets/ref/bmw.svg"
import mac from "../../assets/ref/mac.png"
import fft_l from "../../assets/ref/fft.svg"
import { useTranslation } from "react-i18next";
import { getReferences, ReferenceResponseItem } from "../../utils/queryCms";

const MAX_IMAGE_SIZE = 100;

const useStyles = createStyles((theme) => ({
  refImage: {
    maxHeight: MAX_IMAGE_SIZE,
    maxWidth: MAX_IMAGE_SIZE,
    filter: 'grayscale(1)',
  },
  reference: {
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity .7s cubic-bezier(0.16, 1, 0.3, 1),transform .7s cubic-bezier(0.16, 1, 0.3, 1)",
    textDecoration: 'none',
    boxShadow: '0 0 0 1px #000,0 30px 30px rgba(0,0,0,.07),0 15px 15px rgba(0,0,0,.06),0 10px 8px rgba(0,0,0,.05),0 4px 4px rgba(0,0,0,.04),0 2px 2px rgba(0,0,0,.03)',
    background: theme.fn.lighten(theme.colors.brand[9], 0.05),
    borderRadius: theme.radius.md,
    margin: 'auto',
    ['&:hover']: {
      background: theme.fn.lighten(theme.colors.brand[9], 0.08),
    }
  },
  intersecting: {
    opacity: 1,
    transform: "translateX(0)",
  }
}));
export default function References() {
  const { classes, cx } = useStyles();
  const { t } = useTranslation()
  const container = useRef();
  const { ref: containerRef, entry: containerEntry } = useIntersection({
    root: container.current,
    threshold: 0.2,
    rootMargin: "0px",
  });
  const [error, setError] = useState<any>(null);
  const [references, setReferences] = useState<Array<{ id: number, attributes: ReferenceResponseItem }>>([]);

  useEffect(() => {
    getReferences().then((res) => {
      setReferences(res.data)
    }).catch((error) => {
      console.log(error)
      setError(error)
    })

  }, [])

  if (error || !references || references.length === 0) {
    return null;
  }



  return (
    <Stack spacing={10} my={30} ref={containerRef} px={10}>
      <Text ta="center" italic color="dimmed" size="sm">{t('ourClients')}</Text>
      <Center>
        <Group spacing={50}>
          {references.map((c, i) => {
            const url = c.attributes.logo?.data.attributes?.url
            return (<Box w={MAX_IMAGE_SIZE + 50} h={MAX_IMAGE_SIZE + 50} component="a" key={i} href={c.attributes.link} style={{ transitionDelay: `${i * 200 + 500}ms` }}
              className={cx(classes.reference, { [classes.intersecting]: containerEntry?.isIntersecting })}>
              <Center h="100%">
                <Stack>
                  <Image color="darkgray" src={import.meta.env.VITE_CMS + url} alt={c.attributes.logo?.data.attributes?.alternativeText} className={classes.refImage} />
                </Stack></Center>

            </Box>)
          })}
        </Group>
      </Center>
    </Stack>
  );
}