
import {
  Avatar,
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
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdEdit,
  MdRemoveCircle,
  MdAdd,
  MdCardMembership,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import { useEffect } from "react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { getAccounts } from "../../../../redux/actions/account";

const DevelopmentTable = () => {
  const dispatch = useDispatch()
  const accounts = useSelector(state => state.accounts.accounts)
  const isLoading = useSelector(state => state.accounts.loading)
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");


  const [searchValue, setSearchValue] = useState("")
  const [accountList, setAccountList] = useState(null)
  const [reload, setReload] = useState(0)
  const handleValueChange = (value) => {
    setSearchValue(value)
    console.log("accountList", accountList)
    const result = accountList.filter((account) => {
      return account._id?.includes(searchValue) ||
        account.displayName?.toLowerCase().includes(searchValue) ||
        account.email?.toLowerCase().includes(searchValue) ||
        account.phoneNumber?.includes(searchValue)
    })
    setAccountList(result)
    if (value === "") {
      setAccountList(accounts)
    }
  }

  useEffect(() => {
    if (accounts) {
      setAccountList(accounts)
    }
  }, [accounts])


  useEffect(() => {
    dispatch(getAccounts())
  }, [dispatch])


  return (
    <Card
      direction="column"
      w="100%"
      px="0"
      overflowX={{ sm: "scroll" }}
      overflowY={{ sm: "scroll" }}
    >

      <SearchBar mx="20px" mb="10px" onValueChange={handleValueChange} />

      {!accountList ? <Loading />
        : <>
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Account Manage
            </Text>
            <Link href="/admin/account/new">
              <Button>
                <Icon
                  as={MdAdd}
                  width="20px"
                  height="20px"
                  color="inherit"
                  cursor="pointer"
                />
                Add new account
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
                  >avatar</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >Email</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >display name</Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    Is member
                  </Flex>
                </Th>
                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >role</Flex>
                </Th>

                <Th pe="10px" borderColor={borderColor}>
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >is blocked</Flex>
                </Th>
              </Tr>

            </Thead>

            <Tbody>
              {
                accountList.length != 0 ?
                  accountList.map((acct) => (
                    <Tr>
                      <Td>
                        <Avatar
                          name={acct.name}
                          src={acct.avatar}
                          marginRight="20px"
                        />

                      </Td>
                      <Td>{acct.email}</Td>
                      <Td>{acct.displayName}</Td>
                      <Td>{acct.is_member === true ? "true" : "false"}</Td>
                      <Td>{acct.role}</Td>
                      <Td>{acct.is_blocked ? "true" : "false"}</Td>
                      <Td>
                        <Link href={`/admin/account/edit/${acct._id}`}>
                          <Icon
                            as={MdEdit}
                            width="20px"
                            height="20px"
                            color="inherit"
                            cursor="pointer"
                          />
                        </Link>
                      </Td>
                    </Tr>
                  ))
                  :
                  <Tr>
                    <Td>
                      <Skeleton height='10px' />
                    </Td>
                    <Td><Skeleton height='10px' /></Td>
                    <Td><Skeleton height='10px' /></Td>
                    <Td><Skeleton height='10px' /></Td>
                    <Td><Skeleton height='10px' /></Td>
                    <Td><Skeleton height='10px' /></Td>
                    <Td>
                      <Skeleton height='10px' />
                    </Td>
                  </Tr>
              }
            </Tbody>
          </Table>
        </>}
    </Card >

  );
}
export default DevelopmentTable