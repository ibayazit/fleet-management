const errorHandler = (error) => {
    const errors = []

    if(error?.errors){
        Object.values(error.errors).forEach(e => {
            errors.push(e.message)
        })
    }
    else if (error?.details?.body){
        error.details.body.forEach(e => {
            errors.push(e.message)
        })
    }
    else if (error?.details?.params){
        error.details.params.forEach(e => {
            errors.push(e.message)
        })
    }
    else{
        errors.push(error?.message)
    }

    return {
        message: 'Something went wrong',
        data: [],
        errors
    }
}

module.exports = errorHandler