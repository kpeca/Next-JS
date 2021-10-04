import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';

const HomePage = props => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='Browse a huge list of meetups' />
			</Head>
			<MeetupList meetups={props.meetups} />;
		</Fragment>
	);
};

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://aleksandar123:mzQS3kUTyc7Od7Pu@cluster0.91zfy.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
				id: meetup._id.toString()
			}))
		},
		revalidate: 10
	};
}
export default HomePage;
