import CardComp from './ShadCN/CardComp'

const Cards = (data) => {
  return (
    <>
        {
            data.data.map((company, index) => (
                <CardComp key={index} CardCompany={company} index={index}/>
            ))
        }
    </>
  )
}

export default Cards