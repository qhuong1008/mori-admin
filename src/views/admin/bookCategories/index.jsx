
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/bookCategories/components/DevelopmentTable";

import {
  columnsDataDevelopment,
} from "views/admin/bookCategories/variables/columnsData";
import tableDataDevelopment from "views/admin/bookCategories/variables/tableDataDevelopment.json";

import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <DevelopmentTable
        columnsData={columnsDataDevelopment}
        tableData={tableDataDevelopment}
      />
    </Box>
  );
}
