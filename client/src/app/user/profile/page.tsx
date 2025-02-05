'use client'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label} from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation ,useGetUserQuery} from "@/lib/services/auth";
import { useEffect, useState } from "react";
export default function Home() {
  
  interface User { name: string; email:string; }

  const [user, setUser] = useState<User | null>(null)
  const { data, isSuccess } = useGetUserQuery(null);
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.user)
    }
  }, [data, isSuccess]);
  
  const [logoutUser] = useLogoutUserMutation()
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await logoutUser({})
      if (response.data && response.data.status === "success") {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white pt-24">
        <div className="grid grid-cols-[2fr_5fr]">
        <Card className=" w-[350px] mx-[30px] my-[30px]">
          <div>
            <Image
            className="justify-center mx-auto"
              alt="profile"
              src="/images/profile.png"
              width={200}
              height={200}
            />
          <CardTitle className="px-6 text-center">{user?.name}</CardTitle>
          <CardDescription className="px-6 py-2 text-center">{user?.email}</CardDescription>
        
          </div>
          <div className="grid w-full items-center gap-10 my-2">
            <div className="flex flex-col px-5">
              <Button>Account Info</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button>My Orders</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button>My Addresses</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button>Change password</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </Card>
        
        <div  className=" min-h-screen">
          <Card className="bg-[#FAFAFA] w-[1055px] mx-[30px] my-[30px]">
            <CardTitle className= "text-xl mx-[30px] my-[30px]">Account Info</CardTitle>
            <CardContent>
              <div className="grid w-full items-center gap-4 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="First name">First Name</Label>
                    <Input id="firstname" placeholder="First name" />
                  </div>
                  <div>
                    <Label htmlFor="Last name">Last Name</Label>
                    <Input id="lastname" placeholder="Last name" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Email address">Email address</Label>
                  <Input id="email" placeholder="Email address" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Phone no.">Phone no.</Label>
                  <Input id="phoneno" placeholder="Phone number" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-[120px] h-[50px] px-5">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>  
    </> 
    
  );
}