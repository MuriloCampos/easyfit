import {Box, AspectRatio, Stack, Text, Link, Button} from '@chakra-ui/react'
import Image from 'next/image'

export default function Card(props) {
    const {product, summary, longLine, isSignUpEnabled} = props;

    return (
        <Box
            borderRadius="lg"
            margin={2}
            overflow="hidden"
            borderWidth={1}
            height="100%"
        >
            <Stack
                align={{ base: "center", md: "stretch" }}
                textAlign={{ base: "center", md: "left" }}
                width={500}
                mt={{ base: 4, md: 0 }}
                role="group"
            >
                <Box  overflow="hidden" width={500}
                      height={350}>
                <Box _groupHover={{ transform: "scale(1.2)" }} transition="transform 500ms ease-in-out">
                    <Image
                        src="/sports1.jpg"
                        alt="Picture of the author"
                        width={500}
                        height={350}
                        objectFit="cover"
                    />
                </Box>
                </Box>
                <Box p="6">
                <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="lg"
                    letterSpacing="wide"
                    color="blue.300"
                >
                    {product}
                </Text>
                <Link
                    my={1}
                    display="block"
                    fontSize="md"
                    lineHeight="normal"
                    fontWeight="semibold"
                    href="#"
                >
                    {summary}
                </Link>
                <Text my={2} color="gray.500">
                    {longLine}
                </Text>
                <Button disabled={!isSignUpEnabled} mt={4} bgColor="blue.300" color="white" fontWeight="semibold" _hover={{ background: "blue.500" }}>
                    Junte-se a nós!
                </Button>
                </Box>
            </Stack>
        </Box>
    )
}