# WorkSphere – Virtual Workspace Staff Planner 

**Projet Final – Développeur Full Stack – Youcode 2025**  
**Auteur : Bouchaib El haidi  
**Date de soutenance : 24 novembre 2025**

<img width="1916" height="932" alt="Worksphere" src="https://github.com/user-attachments/assets/97f5090e-697f-4b00-8785-1bc6d5ac8000" />

## Description du projet

WorkSphere est une application web interactive de gestion visuelle du personnel. 
Elle permet d’assigner en temps réel des employés sur un plan d’étage tout en respectant 
les règles métier liées aux rôles et aux zones autorisées.
L’objectif : remplacer un tableau Excel par une solution moderne, fluide et intuitive.

## Fonctionnalités implémentées

- Ajout d’employés via modale (nom, rôle, photo, email, téléphone, expériences dynamiques – max 3)
- Preview en direct de la photo uploadée
- Validation complète (regex + dates de début < fin)
- Plan d’étage interactif avec 6 zones
- Règles d’accès strictes par rôle :
  - Manager → partout
  - Réceptionnistes → uniquement Réception
  - Techniciens IT → uniquement Salle serveurs
  - Agents de sécurité → uniquement Sécurité
  - Nettoyage → partout sauf Archives
  - Autres rôles → uniquement Salle du personnel
- Capacité maximale par zone
- Assignation via le bouton « + » avec liste filtrée des employés éligibles
- Désassignation immédiate via le bouton X
- Modale détaillée au clic sur un employé assigné
- Bordures colorées dynamiques :
  - Rouge pâle → zone obligatoire vide
  - Orange → zone pleine
  - Vert → zone occupée mais pas pleine
- Responsive (desktop, tablette)
- Code 100 % JavaScript Vanilla (aucun framework)

## Technologies utilisées

- HTML5
- CSS3 (Tailwind via CDN)
- JavaScript Vanilla ES6+
- Git & GitHub Projects

## Installation & lancement

      git clone  https://github.com/BOUCHAIB-EL-HAIDI/B_Croise_1_Worksphere
      cd B_Croise_1_Worksphere
open index.html in any browser 













