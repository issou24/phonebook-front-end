import { useState, useEffect } from "react";
import axios from "axios";

import Person from "./assets/components/Persons";
import entryService from "./services/entryService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    console.log("effect");
    axios.get("https://part3-notes-backend-o51h.onrender.com").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    if (notification) {
      setShowMsg(true);
      const timer = setTimeout(() => {
        setShowMsg(false);
        setNotification(null);
      }, 3000); // 4000 ms = 4 secondes

      // Nettoie le timer si notification change ou si le composant se démonte
      return () => clearTimeout(timer);
    }
  }, [notification]);

  console.log("render", persons.length, "persons");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = async (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      // ici on appelle handleDoublon pour proposer la modification
      handleDoublon(existingPerson.id);
      return; // stop la création car on passe par la mise à jour
    }

    const newPerson = { name: newName, number: newNumber };

    // ✅ Ajoute le nom à la liste

    try {
      const returnedPerson = await entryService.createPerson(newPerson);
      setPersons([...persons, returnedPerson]);
      setNotification({
        status: "success",
        msg: `Success: You added ${newName} to the Phonebook!`,
      });
      setShowMsg(true);
      setNewName("");
      setNewNumber("");
    } catch (error) {
      if (error.response) {
        console.error("Erreur backend :", error.response.data);
        alert(
          `Erreur du serveur : ${
            error.response.data.error || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("Pas de réponse du serveur :", error.request);
        alert("Aucune réponse du serveur (problème de connexion ?)");
      } else {
        console.error("Erreur inconnue :", error.message);
        alert("Une erreur inconnue s'est produite.");
      }
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Supprimer ce contact ?");
    if (!confirmDelete) return;

    entryService.deletePerson(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  const Person = ({ person, handleDelete }) => (
    <div>
      {person.name} {person.number}
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );

  const handleDoublon = (id) => {
    const confirmUpdate = window.confirm(
      "deja présent, voulez vous le changer ?"
    );
    setNewNumber("");
    setNewName("");
    if (!confirmUpdate) return;

    const personToUpdate = persons.find((p) => p.id === id);
    const updatedPerson = { ...personToUpdate, number: newNumber }; // par ex.

    entryService.updatePerson(id, updatedPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
      setNewNumber(""); // si tu veux reset le champ
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showMsg && (
        <Notification status={notification.status} message={notification.msg} />
      )}
      <form>
        <div>
          filter shown with :
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
