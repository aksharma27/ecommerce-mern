class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
    this.queryStr = queryStr;
    }

    //search feature
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : 
        {
            
        };
        
        this.query = this.query.find({...keyword});
        return this;
    }


    //filter feature
    filter(){
        const queryCopy = {...this.queryStr};   //coz this is giving actual value, not the reference

        //remove some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);


        //FILTER FOR PRICE AND RATING
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);


        this.query = this.query.find(JSON.parse(queryStr)); //convert queryStr to obj from string
        console.log(queryStr);
        return this;
    }


    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        //how many prod to skip => 2nd page me 10 skip => 3rd page = 20 skip and so on
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

};

module.exports = ApiFeatures;