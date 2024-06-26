import {
  Button,
  Flex,
  Link,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdEdit,
  MdRemoveCircle,
  MdAdd,
  MdImportExport,
  MdDownload,
} from "react-icons/md";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getAllTransactionsRequest } from "../../../../redux/saga/requests/transaction";
import * as utils from '../../../../utils/utils'
const TransactionTable = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const isLoading = props.isLoading;
  const transactions = props.transactions;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([])
  useEffect(() => {
    if (transactions.length !== 0) {
      const filteredList = transactions.filter((transaction) => {
        // Implement your search logic here
        // For example, search by account name, product details, etc.
        const searchTextLower = searchTerm.toLowerCase();
        const accountNameLower = transaction.account ? transaction.account.displayName?.toLowerCase() : ""; // Assuming account has a name property
        const transactionIdLower = transaction._id?.toLowerCase(); // Assuming account has a name property
        const productTypeLower = transaction.productType?.toLowerCase(); // Assuming account has a name property
        const amountLower = transaction.amount?.toString().toLowerCase(); // Assuming account has a name property

        return accountNameLower?.includes(searchTextLower) ||
          transactionIdLower?.includes(searchTextLower) ||
          productTypeLower?.includes(searchTextLower) ||
          amountLower?.includes(searchTextLower)
      });

      setFilteredList(filteredList);
    }
  }, [searchTerm, transactions]);

  useEffect(() => {
    setFilteredList(transactions)
  }, [transactions])
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll" }}
      overflowY={{ sm: "scroll" }}
    >
      <SearchBar mx="20px" mb="10px" value={searchTerm} // Pass current search term
        onValueChange={(value) => setSearchTerm(value)} />

      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Danh sách giao dịch
        </Text>
        <Link href="/admin/tag/new">
          <Button>
            <Icon
              as={MdDownload}
              width="20px"
              height="20px"
              color="inherit"
              cursor="pointer"
            />
            Export to csv
          </Button>
        </Link>
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >ID</Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >Người dùng</Flex>
            </Th>

            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >Loại thanh toán</Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >Sản phẩm</Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >Thời gian</Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >Tổng tiền</Flex>
            </Th>
          </Tr>

        </Thead>

        <Tbody>

          {
            isLoading ?
              <Tr>
                <Td><Skeleton height='10px' /></Td>
                <Td><Skeleton height='10px' /></Td>
                <Td><Skeleton height='10px' /></Td>
                <Td><Skeleton height='10px' /></Td>
                <Td><Skeleton height='10px' /></Td>
                <Td><Skeleton height='10px' /></Td>
              </Tr> :
              filteredList.map(transactionItem => (
                <Tr>
                  <Td>{transactionItem._id}</Td>
                  <Td>{transactionItem.account ? transactionItem.account.displayName : "Deleted account"}</Td>
                  <Td>{transactionItem.productType == "Book" ? "Sách mua lẻ" : "Hội viên"}</Td>
                  <Td>{transactionItem.product}</Td>
                  <Td>{utils.convertMongoDBTimeToHourMinDate(transactionItem.time)}</Td>
                  <Td>{utils.convertToCurrencyFormat(transactionItem.amount)} vnd</Td>
                </Tr>
              ))
          }

        </Tbody>
      </Table>


      <Toaster />
    </Card>
  )
}

export default TransactionTable
