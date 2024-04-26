import { Button } from "../ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { DialogDemo } from "./columns"

const CardComp = (props) => {
  console.log(props)

  return (
    <>  
        <Card key={props.index} className="w-full">
            <CardHeader>
                <CardTitle>{props.CardCompany.startup_name}</CardTitle>
                <CardDescription>{props.CardCompany.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <DialogDemo key={props.index}  {...props.CardCompany}/>
            </CardFooter>
        </Card>
    </>
  )
}

export default CardComp