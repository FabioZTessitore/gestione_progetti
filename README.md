# gestione_progetti

## Appunti e cose da fare

1. ~~Creare una landing page con link a pagine di amministrazione~~
2. ~~Pagina di amministrazione Dipartimenti (GET /dipartimenti)~~
3. ~~Creazione di un nuovo dipartimento con nome (POST /dipartimenti)~~
4. Pagina di amministrazione singolo dipartimento (GET /dipartimenti/:id)
   1. Link a pagina di ammistrazione sedi (GET /sedi?dip=id)
   2. Pagina di amministrazione sedi permette di vedere le sedi inserite, creare una nuova sede e tornare al dipartimento (tutti i passaggi devono portare l'id del dipartimento da cui siamo partiti) (GET /sedi/:id?dip=id)
   3. Il dipartimento seleziona la sede e salva (anche più di una)
5. Pagina degli impiegati (GET /impiegati), crea nuovo impiegato
6. Pagina del singolo impiegato (GET /impiegati/:id)