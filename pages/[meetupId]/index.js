import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import React, { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = props => {
	console.log(props);
	useRouter();
	return (
		<MeetupDetail
			image={props.meetupData.image}
			title={props.meetupData.title}
			address={props.meetupData.address}
			description={props.meetupData.description}
		/>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://aleksandar123:mzQS3kUTyc7Od7Pu@cluster0.91zfy.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();
	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: {
				meetupId: meetup._id.toString()
			}
		}))
	};
}
export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	console.log(meetupId);
	const client = await MongoClient.connect(
		'mongodb+srv://aleksandar123:mzQS3kUTyc7Od7Pu@cluster0.91zfy.mongodb.net/meetups?retryWrites=true&w=majority'
	);

	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId)
	});

	client.close();
	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description
			}
		}
	};
}

export default MeetupDetails;
