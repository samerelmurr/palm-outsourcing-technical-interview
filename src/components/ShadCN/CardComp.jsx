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
                <CardTitle>{props.CardCompcompany.startup_name}</CardTitle>
                <CardDescription>{props.CardCompcompany.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <p>Employees: {props.CardCompcompany.employees}</p>
                <p>Revenue: {props.CardCompcompany.revenue}</p> */}
            </CardContent>
            <CardFooter>
                <DialogDemo key={props.index}  {...props.CardCompcompany}/>
            </CardFooter>
        </Card>
    </>
  )
}

export default CardComp