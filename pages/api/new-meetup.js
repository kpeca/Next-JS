// api/new-meetup
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		const { title, image, address, description } = data;

		const client = await MongoClient.connect(
			'mongodb+srv://aleksandar123:mzQS3kUTyc7Od7Pu@cluster0.91zfy.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		try {
			const db = client.db();
			const meetupsCollection = db.collection('meetups');
			const result = await meetupsCollection.insertOne(data);
			console.log(result);
		} catch (error) {
			console.log(error);
		}

		client.close();

		res.status(201).json({ message: 'Meetup inserted!' });
	}
}
