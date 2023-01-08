# Progetto d'esame "Sviluppo di Servizi Web"

Specifiche: https://elearning.humnet.unipi.it/mod/page/view.php?id=65746

# Struttura dell'app

Nell'app è presente un servizio Angular dedicato alle richieste API verso il backend (key-value as a service),
La chiave (ID) del teatro è statica e viene usata dal servizio in tutte le chiamate API.

Nel componente principale "APP", sono definiti il campo di inserimento del nome e gli unici due
pulsanti presenti. Uno per salvare la prenotazione, l'altro per ripulire la sala da tutte le prenotazioni.

Il componente "theater" si occupa della gestione della UI dei posti del teatro e della selezione dei
posti da prenotare. Oltre ad mostrare il nominativo associato a ciascuna prenotazione al passaggio del cursore.
