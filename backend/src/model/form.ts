

 
/**
 * Class that represents the poetry review form
 * review: the user review
 * poetryType: can be creative, motivation, arts, logic, light
 * rating: the rating out of 10
 * docid: the internal id related to a paticular review form
 */
export default class PoetryReview {

    constructor(public review: string, public type: string, public rating: number, public docid: number) {

    }

}