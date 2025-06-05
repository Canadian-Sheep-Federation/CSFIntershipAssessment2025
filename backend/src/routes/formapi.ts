import express, { Request, Response } from "express";
import { collections } from "../connect/connect";
import PoetryReview from "../model/form";

export const poetryRouter = express.Router();

poetryRouter.use(express.json());

/**
 * Post logic, handles creating incoming user review to the database,
 * sets the docid to the incoming id, or sets to the collection + 1 to always make it unique 
 * returns 200 on sucess, else 500 for database errors
 */
poetryRouter.post("/", async (req: Request, res: Response) => {
    
    try{
       const reviewToAdd = req.body as PoetryReview;

       const userReviews = collections.userreviews;
        if (!userReviews) {
            res.status(500).send({ error: "internal server error" });
            return;
        }

        if(reviewToAdd.docid === 0){
            reviewToAdd.docid = (await userReviews.countDocuments()) + 1;
        }

        await userReviews.insertOne(reviewToAdd);
        
        res.status(200).send({id: reviewToAdd.docid})
        
    }catch(error){
        res.status(500).send({ error: `internal server error ${error}`});
    }
})

/**
 * gets a review form document for given form id that matches the form document
 * returns 200 on sucess, else 500 for database errors
 */
poetryRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const userReviews = collections.userreviews;
        if (!userReviews) {
            res.status(500).send({ error: "internal server error" });
            return;
        }

        const query = { docid: Number(id) };
        const doc = await userReviews.findOne(query);

        if (doc) {
            const review: PoetryReview = {
                review: doc.review,
                type: doc.type,
                rating: doc.rating,
                docid: doc.docid,
            };
            res.status(200).send(review);
        } else {
            res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }
    } catch (error) {
        res.status(500).send({ error: `internal server error ${error}`});
    }
});

/**
 * Fetches all the reviews present in the collection
 * returns 200 on sucess, else 500 for database errors
 */
poetryRouter.get("/", async (req: Request, res: Response) => {
    try {
       
       const userReviews = collections.userreviews;
       
       if(!userReviews){
         res.status(500).send({error: "internal server error"});
         return;
       
        }
       const docs = await userReviews.find({}).toArray();

       const reviews: PoetryReview[] = docs.map((doc: any) => ({
         review: doc.review,
         type: doc.type,
         rating: doc.rating,
         docid: doc.docid,
         id: doc.id
       }));

        res.status(200).send(reviews);
    } catch (error) {
         res.status(500).send({ error: `internal server error ${error}`});
    }
});

