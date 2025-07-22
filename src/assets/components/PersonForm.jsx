const PersonForm = ({PersonForm}) => {
    return (
        const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(newName + " is already added to phonebook");
      return; // arrête la fonction ici
    }

    const newPerson = { name: newName, number: newNumber };

    // ✅ Ajoute le nom à la liste
    setPersons([...persons, newPerson]);

    // ✅ Réinitialise le champ texte
    setNewName("");
    setNewNumber("");
  }
    )
};

export default PersonForm;