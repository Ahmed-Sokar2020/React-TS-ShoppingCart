const NUMBER_FORMATTER = Intl.NumberFormat(undefined, {
    currency:"USD", style:"currency"
})

const formatCurrency = (number:number) => {
    return NUMBER_FORMATTER.format(number);
}

export default formatCurrency