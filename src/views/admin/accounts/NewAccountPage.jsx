
import { Box } from "@chakra-ui/react";
import React from "react";
import NewAccount from "./components/NewAccount";

export default function NewAccountPage() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <NewAccount
      />
    </Box>
  );
}
