import React from 'react'
import Card from '../../Components/Card/Card'
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import ToggleHours from '../../Components/ToggleHours/ToggleHours';

export default function TestPage() {
  const [hours,setHours] = useState([]);
  const [disabled,setDisabled] = useState([
    /*{ "start" : "08:00","end"}*/
  ]);

  const genUid = () => {
    return Math.random().toString(16).slice(2);
  };
  const generateArrayOfTimes = (startHour, endHour, interval = 60) => {
    const times = [];
    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += interval) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push(`${hour}:${minute}`);
      }
    }
    const __t = times.map((_t,i) => {
      if(i<times.length-1){
        return {
          "id" : `${times[i].replace(":", "")}${times[i+1].replace(":","")}`,
          "start" : times[i],
          "end": times[i+1],
          "selected" : false
        };
      }
    }).filter(_t => _t!==undefined && _t)
    return __t;
  }

  const HandleSelect = (id) => {
    let newHours = [...hours]
    const findIndex = newHours.findIndex((_h) => _h?.id===id);
    let item = newHours[findIndex]
    item.selected = !item.selected
    return setHours(newHours)
  }


  const Hours = useCallback(() => setHours(generateArrayOfTimes(6,20,60)),[])
  useEffect(() => {
    Hours();
  },[Hours])
  return (
    <>
        <div className='w-full h-screen p-4 mx-auto'>
          <p>
          Dernière mise à jour : 24 Avril 2023


Conditions générales d’utilisation :

Sommaire : 
1.	Introduction
2.	Notre mission
3.	Acceptation 
4.	Responsabilités
5.	Conditions Générales de Vente
6.	Evaluation
7.	Respect de la vie privée, collecte et traitement des données personnelles: 
8.	Droit d'accès et correction des données personnelles
9.	Modification des conditions générales
10.	Références légales
11.	Litige ou réclamation  


1.	Introduction 

Dweera est le nom de la “plateforme” de commerce électronique composée d'un site web et prochainement d'une application mobile (" marketplace "), ainsi qu'une infrastructure informatique, logistique et de paiement, pour la vente et l'achat de produits de consommation et de services (" produits ").
Dans la suite du contrat, chacune des expressions mentionnées ci-dessus s’entendra au sens de sa définition, à savoir :
« Contrat à distance » : tout contrat concernant des biens ou services entre la Société Linarqa et un Consommateur dans le cadre d’un système de vente ou de prestations de service à distance organisé par la Société Linarqa qui, pour ce contrat, utilise exclusivement le réseau Internet jusqu’à la conclusion du contrat, y compris la conclusion du contrat elle-même.
« Consommateur » : toute personne physique qui, dans le présent contrat, agit à des fins qui n’entrent pas dans le cadre de son activité professionnelle.
« Bon de commande » :  document qui indique les caractéristiques des Produits commandés par le Consommateur et qui doit être signé de lui par « double clic » pour l’engager.
« Commande » : acte par lequel le Consommateur s’engage à acheter des Produits ou Services et la Société Linarqa à les livrer.




2.	Notre mission

Dweera.ma/ Linarqa SARL a pour objectif de créer un environnement/ une communauté de confiance ou les personnes peuvent collaborer dans un monde plus ouvert et inclusif en toute transparence. En commençant par la manière dont nous utilisons vos informations et protégeons votre vie privée.

En tant que annonceur Dweera.ma vous offre le droit d'utiliser la plateforme pour partager votre véhicules, avec notre communauté de Voyageurs, et de gagner de l'argent ce faisant. Vous fixez votre prix, vos disponibilités et les règles pour chaque Annonce.
En tant que voyageur, Dweera.ma vous permet de rechercher des véhicules en utilisant des critères tels que le type de véhicule, la ville, les dates du voyage. Vous pouvez également utiliser des filtres pour affiner vos résultats de recherche. 
3.	Acceptation : 
3.1.	En accédant à Dweera.ma, vous reconnaissez avoir pris connaissance des présentes informations et conditions générales d'utilisation, et reconnaissez les accepter. Il est de votre responsabilité de lire et de comprendre ces conditions, normes, politiques et exigences avant d’accéder et utiliser  Dweera.ma.
3.2.	Ces Conditions Générales s'appliquent aux acheteurs et aux vendeurs sur la plateforme dweera et régissent votre utilisation de la plateforme et de tous les services associés.
3.3.	En utilisant notre plateforme, vous acceptez ces conditions générales dans leur intégralité. Si vous n'êtes pas d'accord avec les présentes conditions générales ou une partie de celles-ci, dans ce cas, vous ne devez pas utiliser notre plateforme.
3.4.	Si vous utilisez notre plateforme dans le cadre d'une entreprise ou d'un quelconque autre projet commercial, ce faisant, vous: 
3.4.1.	Confirmez que vous avez obtenu l'autorisation nécessaire pour accepter les présentes conditions générales;
3.4.2.	Vous engagez, ainsi que la personne, la société ou toute autre entité juridique qui exploite cette entreprise ou ce projet commercial, à respecter les présentes conditions générales; et
3.4.3.	Acceptez que le terme «vous», utilisé dans les présentes conditions générales, fasse référence à la fois à l'utilisateur individuel et à la personne, à la société ou à l'entité juridique concernée, sauf si le contexte exige qu’il en soit autrement.

4.	Responsabilités
4.1.	Annonceurs/utilisateurs
Les annonceurs/utilisateurs reconnaissent que le contenu publicitaire, y compris les textes, images, graphiques, vidéos ("Contenu") publié sur la plateforme est exact et conforme aux lois en vigueur. Dweera.ma / Linarqa SARL n'assume aucune responsabilité quant à toute illicéité ou toute erreur relative aux annonces sur le site. L'annonceur/utilisateur convient que son contenu ne viole aucun droit d'auteur, droits de propriété intellectuelle ou d'autres droits de toute personne ou entité.
Votre relation avec Dweera.ma / Linarqa SARL est celle d'une entité ou d'un individu indépendant et non un salarié, agent, co-entrepreneur ou partenaire de Dweera.ma / Linarqa SARL. 
Dweera.ma/ Linarqa SARL ne dirige ni ne contrôle votre Service de location de véhicules. Vous comprenez que vous avez toute latitude pour décider si et quand vous souhaitez fournir des services de location de véhicules, et à quel prix et à quelles conditions les offrir.

4.2.	Voyageurs
Les voyageurs sont responsables de leurs propres actes et omissions concernant un véhicule. cela comprend, mais ne se limite pas au fait que vous avez la responsabilité de laisser un véhicule (et les biens personnels associés) dans l'état dans lequel vous l'avez trouvé, vous avez la responsabilité de payer tous les montants de demande d'indemnisation nécessaires pour couvrir les dommages que vous avez causés à un véhicule, et vous devez agir avec intégrité, traiter les autres avec respect et vous conformer aux lois applicables en tout temps. 

4.3.	Inscription et compte
4.3.1.	Vous ne pouvez pas vous inscrire sur notre plateforme/Marketplace si vous avez moins de 18 ans (en utilisant notre plateforme ou en acceptant les présentes conditions générales, vous nous garantissez et vous nous déclarez que vous avez au moins 18 ans).
4.3.2.	Votre compte doit être utilisé exclusivement par vous et vous ne devez en aucun cas transférer votre compte à un tiers. Si vous autorisez un tiers à gérer votre compte en votre nom, vous le faites à vos propres risques.
4.3.3.	Nous pouvons suspendre ou annuler votre compte, et / ou modifier les détails de votre compte, à tout moment, à notre seule discrétion et sans préavis ni explication.

4.4.	Role de Dweera.ma : 

Nous vous offrons le droit d'utiliser une plateforme permettant aux Membres de publier, d'offrir, de rechercher et de réserver des véhicules. Lorsque des Membres font ou acceptent une réservation, ils concluent un contrat entre eux directement. Dweera.ma n'est pas et ne devient pas partie à un quelconque contrat passé entre des Membres. Dweera.ma n'agit pas en qualité de mandataire d'un quelconque Membre.

5.	Conditions Générales de Vente
Vous reconnaissez et acceptez que:

5.1.	Lorsque vous réservez une Annonce, vous acceptez de payer tous les frais relatifs à votre réservation, y compris le prix du location du véhicule fixé dans l'Annonce, les frais applicables tels  que les frais de service Dweera.ma, les frais perçus en personne, les taxes et tout autre élément faisant partie du « Prix total ». Lorsque vous recevez la confirmation de réservation, un contrat/ Réservation est formé directement entre vous et l’annonceur/Utilisateur. Outre les présentes Conditions, vous serez soumis et responsable du respect de toutes les conditions de la Réservation, y compris, mais sans s'y limiter, les conditions d'annulation et tous les autres règlements, normes, politiques ou exigences identifiés dans l'Annonce ou lors du paiement qui s'appliquent à la Réservation. Il est de votre responsabilité de lire et de comprendre ces règlements, normes, politiques et exigences avant de réserver une Annonce. 

5.2.	Politique d’annulation et de remboursement:

5.2.1.	En cas d'annulation par le vendeur avant la date de réservation:
Si le vendeur annule une réservation avant l'arrivée, le consommateur/voyageur reçoit automatiquement un remboursement intégral. 
5.2.2.	La politique d'annulation de Linarqa/Dweera.ma dépend du statut de la commande. Si la commande n'a toujours pas été acceptée par le vendeur, vous avez toujours la possibilité de demander l'annulation dans votre espace en ligne au niveau de la plateforme dweera. Si la commande a été déjà acceptée par le vendeur ou encore récupérée, vous n'êtes plus en mesure de l'annuler et vous serez facturés de la valeur totale de la commande.
5.2.3.	En cas d’un autre problème rencontré par le consommateur/client : 
Nous acceptons les ventes fermes, au nom des vendeurs, mais (sauf si Linarqa est indiqué comme vendeur) Linarqa/dweera.ma n'est pas partie à la transaction entre le vendeur et l'acheteur.  Un contrat pour la vente et l'achat d'un ou de plusieurs services/produits entrera en vigueur entre l’acheteur et le vendeur, et en conséquence vous vous engagez à acheter ou à vendre le ou les services/produits concernés, dès la confirmation d'achat par l'acheteur via notre marketplace/plateforme.

5.3.	Une réservation est une licence limitée pour utiliser le véhicule.  L’annonceur/Utilisateur se réserve le droit de récupérer le véhicule pendant votre période de réservation, le cas échéant si cela est raisonnablement nécessaire, cela est autorisé en vertu de votre contrat avec l’annonceur/utilisateur, et cela est conforme au droit applicable. Si vous gardez le véhicule après l'heure de départ, l’annonceur/utilisateur a le droit de vous imposer des sanctions raisonnables pour utilisation indûment prolongée. 

Les annonceurs/utilisateurs et les voyageurs sont responsables de toute modification de réservation qu'ils acceptent d'apporter par le biais de la plateforme Dweera.ma et acceptent de payer tout montant, frais ou taxes supplémentaires associés à toute modification de réservation.

5.4.	Tous les produits présents dans le catalogue sont commercialisés jusqu'à épuisement des stocks.

La société Linarqa se réserve le droit de retirer du catalogue un article, et ceci sans préavis, elle ne peut en aucun cas être tenu de dédommager ou d'annuler une commande suite à l'impossibilité d'utiliser le produit ou service acheté pour n’importe quelle raison.

5.5.	En cas d’erreur de votre part, au moment de votre saisie sur le bon de commande, nous vous conseillons de nous adresser dans les 24 h une demande d’annulation par e-mail ; Après annulation de la commande par Linarqa, vous pouvez commander à nouveau. 

5.6.	Mode de paiement : 
Pour régler votre commande, vous choisissez le moyen de paiement parmi ceux proposés par notre plateforme c-à-d "Paiement cash à la livraison" ou  par “Paiement par carte bancaire”.

 
Vos paiements Multi-canaux sont sécurisés par le Centre Monétique Interbancaire (CMI) qui offre un service de paiement entièrement sécurisé.
 
Le Consommateur garantit à la Société Linarqa qu’il dispose des autorisations éventuellement nécessaires pour utiliser le mode de paiement choisi par lui, lors de la validation du Bon de commande.

En cas de paiement par carte bancaire, les dispositions relatives à l’utilisation frauduleuse du moyen de paiement prévues dans les conventions conclues entre le Consommateur et l’émetteur de la carte entre la Société Linarqa et son établissement bancaire s’appliquent.

5.7.	Preuve des transactions payés par carte bancaire :

Les données enregistrées par le CMI sur la plate-forme de paiement Multi-canal pour le compte de Linarqa constituent la preuve de l’ensemble des transactions commerciales passées entre vous et la société Linarqa.

5.8.	Les produits/services doivent être de qualité adéquate et satisfaisante, adaptés et sûrs pour tout usage spécifié dans la liste des produits/services et toute autre description des produits/services fournie ou mise à disposition de l’acheteur par le vendeur, et être conformes à tous égards importants à cette liste.

5.9.	Les frais de livraison, les frais administratifs, les frais d'assurance, les autres frais et charges accessoires ne seront à la charge de l'acheteur que si cela est expressément et clairement indiqué dans la liste et le descriptif des produits/services concernés.

5.10.	Le prix de tout produit doit inclure toutes les taxes et être conforme aux lois applicables en vigueur de temps à autre.

5.11.	Force majeure :   Linarqa n’est tenu pour l’exécution de ses obligations que dans la mesure où aucun événement de force majeure ne vient les entraver.

6.	Evaluation  : 

 Dweera.ma met à la disposition des utilisateurs et des loueurs des moyens leur permettant d’évaluer leurs performances respectives à l’issue de l’exécution des prestations commandées sur le site. Cette transparence permet aux utilisateurs de sélectionner les loueurs les plus sérieux et qui respectent le mieux les conditions d’utilisation du service ainsi qu’aux loueurs un moyen pour sélectionner les utilisateurs les plus sérieux.

L’appréciation est réalisée suivant des critères d’évaluation et par l’attribution d’une note et/ou d’étoile(s). A ce titre, Dweera.ma  n’assure aucun contrôle de  l’appréciation réalisée par les utilisateurs, qu’elle se contente de stocker. Elle peut toutefois être amenée à supprimer, sans préavis, toute appréciation dont le contenu lui aurait été signalé comme étant illicite. Les évaluations laissées par l'utilisateur et/ou loueur, peuvent faire l’objet d’une publication sur le Site.



7.	Respect de la vie privée, collecte et traitement des données personnelles: 

Lorsque vous utilisez Dweera.ma vous acceptez que LINARQA Sarl-au ( immatriculée au Registre du Commerce de Casablanca sous le numéro 546571-et dont le siège social est situé au 26 AV MERS SULTAN ETG1 APT 3, Casablanca) utilise vos informations dans le cadre prévu par la loi marocaine et dans le respect absolu de la vie privée. Elle stocke et traite vos informations sur des ordinateurs situés dans le cloud public et qui sont protégés par des méthodes de sécurité aussi bien physiques que technologiques. Vous pouvez consulter et modifier les informations que vous nous fournissez, et choisir de ne pas recevoir certains types de communications lors de l'ouverture de votre compte ou à tout autre moment. 

Vous n’avez pas à décliner votre identité pour naviguer sur Dweera.ma.Toutefois, si vous choisissez de nous les fournir, vous acceptez le transfert et le stockage de ces informations sur nos serveurs. Nous pouvons recueillir et enregistrer les données personnelles suivantes :le nom, l'adresse e-mail, la date d’inscription, la ville ainsi que le quartier correspondant, le numéro de téléphone,les coordonnées physiques, la date de naissance,votre photo et votre CIN ;les informations relatives à vos activités sur le site; les informations relatives à votre ordinateur et votre connexion, des statistiques sur les pages affichées, les données de navigation, les données publicitaires, votre adresse IP ;les informations supplémentaires que nous vous demandons d'envoyer pour vous authentifier ou si nous pensons que vous enfreignez le règlement du site ; ou toute autre façon justifiée de recueillir des informations permettant de vérifier votre identité.

L'objectif principal de cette collecte de données personnelles est de vous offrir une expérience sûre, optimale, efficace et personnalisée. Vous acceptez que nous puissions utiliser/divulguer vos données personnelles pour satisfaire à des obligations légales ou pour faire appliquer les présentes conditions générales. 

8.	Droit d'accès et correction des données personnelles

Conformément à la loi 09-08 promulguée par le Dahir 1-09-15 du 18 février 2009 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel, vous disposez d’un droit d’accès, de rectification, et d’opposition des données relatives aux informations vous concernant. Vous pouvez l’exercer par courrier électronique à l’adresse suivante : support@dweera.ma. Vous pouvez également, pour des motifs légitimes, vous opposer à ce que les données qui vous concernent fassent l’objet d’un traitement. 

9.	Modification des conditions générales : 


Dweera/Linarqa SARL se réserve le droit de modifier les conditions générales d’utilisation du site à n'importe quel moment. Toutefois, lorsque nous proposons des modifications aux présentes Conditions, nous publions les conditions mises à jour sur la plateforme et actualisons la date de « dernière mise à jour » figurant en haut de la page des présentes Conditions.  Toute modification entrera en vigueur immédiatement après sa publication sur Dweera.ma. Vous êtes tenus de consulter régulièrement le site et votre accès régulier ou usage du site Dweera.ma induisent votre approbation des modalités et conditions modifiées.

10.	Références légales:

L’annonceur et Dweera.ma/Linarqa SARL sont soumis au droit marocain et notamment les textes de lois suivants :Dahir n° 1-07-129 du 19 kaada 1428 portant promulgation de la loi n° 53-05 relative à l'échange électronique de données juridiques.Décret n° 2-08-518 du 25 joumada i 1430 pris pour l'application des articles 13, 14, 15, 21 et 23 de la loi n° 53-05 relative à l'échange électronique des données juridiques.Dahir n° 1-09-15 du 22 safar 1430 portant promulgation de la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Décret n° 2-09-165 du 25 joumada i 1430 pris pour l'application de la loi n° 09-08 relative à la protection des personnes physiques à l'égard des traitements des données à caractère personnel. Décision du premier ministre n°3-33-11 en date du 28 mars 2011 approuvant le règlement intérieur de la commission nationale de protection des données à caractère personnel. Dahir n° 1-11-03 du 14 rabii I 1432 portant promulgation de la loi n° 31-08 édictant des mesures de protection du consommateur. Dahir n° 1-03-197 du 16 ramadan 1424 portant promulgation de la loi n° 07-03 complétant le code pénal en ce qui concerne les infractions relatives aux systèmes de traitement automatisé des données.

11.	Litige ou réclamation : 

Tout litige ou réclamation afférents à l'utilisation du site Dweera.ma sera de la compétence exclusive du tribunal de commerce de Casablanca.





          </p>
        </div>
    </>
  )
}
