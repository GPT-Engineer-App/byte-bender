import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toast = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLoggingIn ? "/login" : "/signup";
    const response = await fetch(`https://backengine-z3nu.fly.dev${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      const accessToken = data.accessToken || "";
      toast({
        title: isLoggingIn ? "Logged In Successfully!" : "Signed Up Successfully!",
        description: isLoggingIn ? `Access Token: ${accessToken}` : "Please log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={8} py={12}>
        <Heading>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
        <Box w="100%" maxW="md">
          <form onSubmit={handleAuth}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={isLoggingIn ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" w="full" type="submit">
                {isLoggingIn ? "Login" : "Sign Up"}
              </Button>
            </VStack>
          </form>
        </Box>
        <Text cursor="pointer" color="blue.500" onClick={() => setIsLoggingIn(!isLoggingIn)}>
          {isLoggingIn ? "No account? Sign up" : "Already have an account? Login"}
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;
