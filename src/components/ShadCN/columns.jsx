"use client";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Description } from "@radix-ui/react-dialog";


export function DialogDemo(data) {
  
  const calcInvestmentGoal = (data) => {
    const value = Math.round((data.previous_funding_rounds[0].amount_raised/data.investment_goal) * 100);
    return value;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Info</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-1/2 max-sm:w-full max-sm:h-4/5">

        <DialogHeader>
          <DialogTitle>{data.startup_name}</DialogTitle>
        </DialogHeader>

        <Label>Investment Goal</Label>
        <Progress value={calcInvestmentGoal(data)} /> 
        <Description className="text-end">{calcInvestmentGoal(data)}%</Description>

        <div className="max-sm:overflow-y-auto">
          <Description className="font-bold">Legal Information: </Description>
          <Label>{data.legal_information}</Label>

          <Description className="font-bold">Risks and Challenges: </Description>
          <Label>{data.risks_and_challenges}</Label>

          <Description className="font-bold">Investor Benefits: </Description>
          <Label>{data.investor_benefits}</Label>

          <Description className="font-bold">Communication Channels: </Description>
          <Label>{data.communication_channels.join(", ")}</Label>

          <Description className="font-bold">Financial Projections: </Description>
          <Label>
            Revenue: {data.financial_projections.revenue}
            <br />
            Growth Rate: {data.financial_projections.growth_rate}
          </Label>

          <Description className="font-bold">Use of Funds: </Description>
          <Label>
            {Object.entries(data.use_of_funds).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
          </Label>

          <Description className="font-bold">Milestones: </Description>
          <Label>{data.milestones.join(", ")}</Label>

          <Description className="font-bold">Team: </Description>
          <Label>
            {data.team.map((founder) => (
              <div key={founder.name}>
                {founder.name}: {founder.background}
              </div>
            ))}
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const columns= [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className='p-0'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				><ArrowUpDown className="h-4 w-4 mr-1" />ID
			  </Button>
			)
		},
	},
	{
		accessorKey: "startup_name",
		header: "Name",
	},
	{
		accessorKey: "investment_goal",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className='p-0'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				><ArrowUpDown className="h-4 w-4 mr-1" />Investment Goal
			  </Button>
			)
		},
	},
	{
		accessorKey: "minimum_investment",
		header: "Minimum Investment",
	},
	{
		accessorKey: "equity_offered",
		header: "Equity Offered",
	},
	{
		accessorKey: "sector",
		header: "Sector",
	},
	{
		accessorKey: "valuation",
		header: "Valuation",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "timeline.start_date",
		header: "Start Date",
	},
	{
		accessorKey: "timeline.end_date",
		header: "End Date",
	},
	{
		accessorKey: "info",
		header: "Info",
		id: "actions",
		cell: ({ row }) => {
			const data = row.original;
			return DialogDemo(data);
		},
	},
];
