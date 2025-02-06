// src/routes/people.ts
import {Router} from 'express';
import axios from "axios";
import {IPerson} from "../types/IPerson";
import Person from "../models/Person";

const router = Router();

router.get('/check/:uuid', async (req, res) => {
    const { uuid } = req.params;
    console.log(`Check if Person with UUID exists: ${uuid}`);
    try {
        const personExists = await Person.exists({ 'login.uuid': uuid });
        res.status(200).json({ exists: !!personExists });
    } catch (error) {
        console.error('Failed to check for Person', error);
        res.status(500).json({ message: 'An error occurred while checking for the person' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(`Update Person with ID: ${id}`, body);

    try {
        // Find the person by ID and update their details
        const updatedPerson = await Person.findOneAndUpdate(
            { 'login.uuid': id }, // Assuming 'login.uuid' is your unique identifier
            body,
            { new: true, runValidators: true } // 'new' returns the updated document rather than the original, 'runValidators' makes sure the schema validations are run
        );

        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }

        console.log(`Person updated: ${updatedPerson.id}`);
        res.status(200).json(updatedPerson);
    } catch (error) {
        console.error('Failed to update Person', error);
        res.status(500).json({ message: 'An error occurred while updating the person' });
    }
});

router.post('/', async (req, res) => {
    const personData = req.body;
    console.log(`Create Person`, personData.name);
    const newPerson = new Person(personData)
    try {
        const responseData = await newPerson.save()
        if (!responseData) throw new Error('Something went wrong saving the Person');
        console.log(`Person created: ${responseData.id}`);
        res.status(200).json(responseData)
    } catch (error) {
        console.error('Failed to save Person', error);
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Delete Person with ID: ${id}`);
    try {
        // Assuming 'login.uuid' is the field where the UUID is stored in your schema
        const deletedPerson = await Person.findOneAndDelete({ 'login.uuid': id });
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        console.log(`Person deleted: UUID - ${id}, Mongo ID - ${deletedPerson._id}`);
        res.status(200).json({ message: 'Person deleted successfully', id: deletedPerson._id });
    } catch (error) {
        console.error('Failed to delete Person', error);
        res.status(500).json({ message: 'An error occurred while deleting the person' });
    }
});

const NumberOfPeople = 10;
router.get('/randomPeople', async (req, res) => {
    console.log('Find random people');
    // use axios to get random person from https://randomuser.me/api/
    const peopleData = await getRandomPeople(NumberOfPeople);
    /*const personData = { name: "John Doe" }*/
    console.log(`Found random people: ${peopleData.map((person :IPerson) => `${person.name.title} ${person.name.first} ${person.name.last}`).join(', ')}`);
    res.status(200).json(peopleData)
})

const randomUserApi = `https://randomuser.me/api`;
async function getRandomPeople(numberOfPeople: number) {

    try {
        const response = await axios.get(`${randomUserApi}/?results=${numberOfPeople}`);
        // The response structure changes to include an array of users under 'results'
        return response.data.results;
    } catch (error: any) {
        console.error('An error occurred while fetching data:', error.message);
        throw error; // Re-throw the error for the caller to handle
    }
}

// Add more routes as needed

export default router;
