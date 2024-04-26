import CardComp from './ShadCN/CardComp'

const Cards = (data) => {
  return (
    <>
        {
            data.data.map((company, index) => (
                <CardComp key={index} CardCompcompany={company} index={index}/>
            ))
        }
    </>
  )
}

export default Cards