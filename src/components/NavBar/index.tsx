"use client";

import ContainerWrapper from "../ContainerWrapper";
import {
  Box,
  Text,
  HStack,
  Button,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { ETHABJ_SVG } from "@/assets/svg/index";
import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import { COLORS } from "@/constants/theme/lightDarkTheme";
import { For } from "million/react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { NavBarLinks as tabs } from "@/lib/config/site";
import { JOIN_COM_URL } from "@/utils/config";
import ConnectButton from "../wagmi/connectButton";

const NavBar = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const { appTheme } = useAppSelector((state) => state.themeReducer);
  const pathname = usePathname();

  const isDonationPage = pathname === "/donation" || pathname === "/faucet";

  return (
    <Box
      boxShadow={COLORS.navBoxShadow}
      backdropFilter="blur(20px)"
      backgroundColor={"whiteAlpha.700"}
      zIndex={50}
      h="80px"
      border="0px solid #314D53"
    >
      <ContainerWrapper maxW={"1150px"} mx={"auto"}>
        <Flex h={"80px"} justify={"space-between"} align="center">
          <Link
            href={"/home"}
            role="logo_link"
            style={{ textDecoration: "none" }}
          >
            {ETHABJ_SVG().logo()}
          </Link>

          <Flex gap="4px" display={["none", "none", "flex", "flex"]}>
            <For each={tabs}>
              {(e) => (
                <Link href={e.link} style={{ textDecoration: "none" }}>
                  <HStack
                    p="10px"
                    color={
                      pathname?.includes(e.link)
                        ? appTheme.backgroundColorReverse
                        : pathname === "/" && e.link === "/home"
                        ? appTheme.backgroundColorReverse
                        : appTheme.backgroundColorReverse
                    }
                    bgClip={
                      pathname?.includes(e.link)
                        ? "text"
                        : pathname === "/" && e.link === "/home"
                        ? "none"
                        : "none"
                    }
                    bgGradient={
                      pathname?.includes(e.link)
                        ? COLORS.navHoverLinkColor
                        : pathname === "/" && e.link === "/home"
                        ? "none"
                        : "none"
                    }
                  >
                    {/* {e.icon} */}
                    <Text fontWeight={500}>{e.name}</Text>
                  </HStack>
                </Link>
              )}
            </For>
          </Flex>

          <Box display={["none", "none", "flex", "flex"]}>
            {isDonationPage ? (
              <>
                <ConnectButton />
              </>
            ) : (
              <Link
                href={JOIN_COM_URL}
                target="_blank"
                display={"flex"}
                w={"160px"}
                py={"12px"}
                px={"0"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                borderRadius={"8px"}
                border={"1px solid #000"}
                _hover={{ textDecor: "none" }}
                bgGradient={
                  "linear(90deg, #4662AA 0%, rgba(154, 57, 229, 0.90) 102.94%)"
                }
                style={{ textDecoration: "none" }}
              >
                <Text
                  color={"#FDFDFF"}
                  fontSize={"16px"}
                  fontWeight={"500"}
                  lineHeight={"26.4px"}
                >
                  Join Community
                </Text>
              </Link>
            )}
          </Box>

          <Button
            aria-label="Open Menu"
            display={["flex", "flex", "none", "none"]}
            onClick={() => setMobileNav(true)}
            bg={"none"}
            p={"0"}
            _hover={{
              bg: "none",
            }}
          >
            <Icon as={RxHamburgerMenu} fontSize={"2rem"} color={"black"} />
          </Button>

          <Flex
            display={["flex", "flex", "none", "none"]}
            w={"100vw"}
            bg={"white"}
            zIndex={"20"}
            h={"100vh"}
            position={"fixed"}
            top={"0"}
            left={"0"}
            overflowY={"auto"}
            flexDirection={"column"}
            justify={"space-around"}
            align={"center"}
            transform={mobileNav ? "translateX(0)" : "translateX(-100%)"}
            transition={"all .5s ease-in-out"}
            px={"1.5rem"}
          >
            <Flex mt={7} ml={6} position={"absolute"} top={"0"} left={"0"}>
              <Link
                href={"/home"}
                role="logo_link"
                style={{ textDecoration: "none" }}
              >
                {ETHABJ_SVG().logo()}
              </Link>
            </Flex>
            <Flex position={"absolute"} top={"0"} right={"0"}>
              <Button
                aria-label="Close Menu"
                mt={8}
                mr={6}
                onClick={() => setMobileNav(false)}
                bg={"none"}
                p={"0"}
                _hover={{
                  bg: "none",
                }}
              >
                <Icon as={AiOutlineClose} fontSize={"1.8rem"} />
              </Button>
            </Flex>
            <Flex
              gap="4px"
              display={["flex", "flex", "none", "none"]}
              flexDir={"column"}
              alignSelf={"flex-start"}
              w={"100%"}
              mt={"1.5rem"}
            >
              {/* <For each={tabs}> */}
              {tabs.map((e) => (
                <Box key={e.link}>
                  <Link
                    href={e.link}
                    style={{ textTransform: "none", textDecoration: "none" }}
                    onClick={() => setMobileNav(false)}
                    key={nanoid()}
                  >
                    <HStack
                      p="10px"
                      color={
                        pathname?.includes(e.link)
                          ? appTheme.backgroundColorReverse
                          : pathname === "/" && e.link === "/home"
                          ? appTheme.backgroundColorReverse
                          : appTheme.backgroundColorReverse
                      }
                      bgClip={
                        pathname?.includes(e.link)
                          ? "text"
                          : pathname === "/" && e.link === "/home"
                          ? "none"
                          : "none"
                      }
                      bgGradient={
                        pathname?.includes(e.link)
                          ? COLORS.navHoverLinkColor
                          : pathname === "/" && e.link === "/home"
                          ? "none"
                          : "none"
                      }
                    >
                      {/* {e.icon} */}
                      <Text fontWeight={500}>{e.name}</Text>
                    </HStack>
                  </Link>
                  <Divider />
                  <Divider />
                </Box>
              ))}
              {/* </For> */}
            </Flex>
            <Box display={["flex", "flex", "none", "none"]}>
              {isDonationPage ? (
                <>
                  <ConnectButton />
                </>
              ) : (
                <Link
                  as="a"
                  href={JOIN_COM_URL}
                  target="_blank"
                  display={"flex"}
                  w={["300px", "", "350px"]}
                  py={"12px"}
                  px={"0"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"10px"}
                  borderRadius={"8px"}
                  border={"1px solid #000"}
                  bg={COLORS.joinComColorBTN}
                  _hover={{
                    bg: COLORS.joinComColorBTN,
                    borderColor: "1px solid black",
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Text
                    color={"#FDFDFF"}
                    fontSize={"16px"}
                    fontWeight={"500"}
                    lineHeight={"26.4px"}
                  >
                    Join Community
                  </Text>
                </Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </ContainerWrapper>
    </Box>
  );
};

export default NavBar;
