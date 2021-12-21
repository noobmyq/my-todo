/*
 * @Date: 2021-12-21 18:24:50
 * @LastEditTime: 2021-12-21 20:57:03
 * @FilePath: /new-simple-todo/my-todo/frontend/src/components/Header.tsx
 */
import React from "react";
import { Heading, Flex, Divider } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";

const Header: React.FC = () => {
    return (
        <Flex
            // as="nav"
            // align="center"
            // justify="space-between"
            // wrap="wrap"
            padding="0.5rem"
        // bg="gray.400"
        >
            <Flex align="center" mr={5}>
                <Heading as="h2" size="md">Todos</Heading>
                <Divider />
            </Flex>
        </Flex>
    );
}

export default Header;