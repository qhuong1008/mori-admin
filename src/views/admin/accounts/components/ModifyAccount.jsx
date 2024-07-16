import {
  Flex,
  useColorModeValue,
  Text,
  FormLabel,
  Input,
  Avatar,
  Select,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Loading from "components/loading/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAccountByIdRequest, getMembershipByIdRequest } from "../../../../redux/saga/requests/account";
import { Toaster, toast } from "react-hot-toast";
import { updateAccountRequest } from "../../../../redux/saga/requests/account";


const ModifyAccount = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const params = useParams()
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null)
  const id = params.id;

  const [avatar, setAvatar] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isMember, setIsMember] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [role, setRole] = useState(0)
  const [isBlocked, setIsBlocked] = useState("")
  const [membership, setMembership] = useState(null)

  const handleUpdateAccount = async () => {
    const request = {
      account: {
        avatar, email, username, displayName, phoneNumber, role, is_blocked: isBlocked
      }
    }
    console.log("request:", request)
    toast.promise(
      new Promise((resolve, reject) => {
        updateAccountRequest(id, request)
          .then((resp) => {
            if (resp.updatedAccount) {
              resolve("Cập nhật thành công!")
              window.location.replace("/admin/accounts");
              console.log("resp", resp)
            }
            else {
              reject("Cập nhật thất bại!");
            }
          })
          .catch(err => {
            console.log("err", err)
          })

      }),
      {
        loading: "Processing...",
        success: (message) => message,
        error: (error) => error.message,
      }
    );
  }

  const getMembershipData = (id) => {
    getMembershipByIdRequest(id).then(resp => {
      if (resp.membership) {
        setMembership(resp.membership)
      }
    })
  }

  useEffect(() => {
    getAccountByIdRequest(id).then(res => {
      setAccount(res.account)
      getMembershipData(id)
    })
  }, [])
  useEffect(() => {
    if (account) {
      setAvatar(account.avatar)
      setEmail(account.email)
      setDisplayName(account.displayName)
      setUsername(account.username)
      setPhoneNumber(account.phoneNumber)
      setRole(account.role)
      setIsBlocked(account.is_blocked)
      setIsMember(account.is_member)
    }
  }, [account])

  return (
    <div>
      {account ?
        <Card direction="column" w="100%" px="0px" pb="60px">

          <>
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                Account Information
              </Text>
            </Flex>
            <Flex
              mx="25px"
              my="10px"
              justifyContent="left"
              flexDirection="row"
              alignItems="center"
            >
              <Avatar
                name="Dan Abrahmov"
                src={avatar}
                marginRight="20px"
              />
              <FormLabel w="auto">{displayName}</FormLabel>
            </Flex>

            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Username</FormLabel>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Display name</FormLabel>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Phone Number</FormLabel>
              <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Role</FormLabel>
              <Select value={role} onChange={e => setRole(e.target.value)}>
                <option value="0">User</option>
                <option value="1">Admin</option>
              </Select>
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Is blocked</FormLabel>
              <Select value={isBlocked} onChange={e => setIsBlocked(e.target.value)}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Select>
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Is member</FormLabel>
              <Input value={isMember} disabled />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Membership duration</FormLabel>
              <Input value={membership.type} disabled />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Membership start date</FormLabel>
              <Input value={membership.start_date} disabled />
            </Flex>
            <Flex
              mx="25px"
              my="5px"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
            >
              <FormLabel w="150px">Membership end date</FormLabel>
              <Input value={membership.outdated_on} disabled />
            </Flex>
            <Button
              width="100px"
              colorScheme="blue"
              right="0"
              position="absolute"
              marginRight="25px"
              marginBottom="25px"
              bottom="-10px"
              onClick={handleUpdateAccount}
            >
              Update
            </Button>
          </>
        </Card> : <Loading />}
      <Toaster />
    </div>
  );
};

export default ModifyAccount;
