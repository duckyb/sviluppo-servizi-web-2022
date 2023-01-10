# Progetto d'esame "Sviluppo di Servizi Web"

Specifiche: https://elearning.humnet.unipi.it/mod/page/view.php?id=65746

# Struttura dell'app

Nell'app è presente un servizio Angular dedicato alle richieste API verso il backend (key-value as a service),
La chiave (ID) del teatro è dinamica e viene ottenuta in base all'URL.

L'app presenta due pagine:
- Selection Layout: La pagina dove si gestiscono i teatri e si effettua l'accesso
- Theater Layout: La pagina dove si visualizza il teatro e si gestiscono le prenotazioni

Il componente "theater" si occupa della gestione della UI dei posti del teatro e della selezione dei posti da prenotare. Oltre ad mostrare il nominativo associato a ciascuna prenotazione al passaggio del cursore.
