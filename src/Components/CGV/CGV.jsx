import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

export default function CGV() {
    const [conditions] = useState([
        {
          title : "Introduction",
          context : {
            type : "paragraph",
            body : [
              `Dweera est le nom de la “plateforme” de commerce électronique composée d'un site web et prochainement d'une application mobile (" marketplace "), ainsi qu'une infrastructure informatique, logistique et de paiement, pour la vente et l'achat de produits de consommation et de services (" produits ").`,
              `Dans la suite du contrat, chacune des expressions mentionnées ci-dessus s’entendra au sens de sa définition, à savoir :`,
              `« Contrat à distance » : tout contrat concernant des biens ou services entre la Société Linarqa et un Consommateur dans le cadre d’un système de vente ou de prestations de service à distance organisé par la Société Linarqa qui, pour ce contrat, utilise exclusivement le réseau Internet jusqu’à la conclusion du contrat, y compris la conclusion du contrat elle-même.`,
              `« Contrat à distance » : tout contrat concernant des biens ou services entre la Société Linarqa et un Consommateur dans le cadre d’un système de vente ou de prestations de service à distance organisé par la Société Linarqa qui, pour ce contrat, utilise exclusivement le réseau Internet jusqu’à la conclusion du contrat, y compris la conclusion du contrat elle-même.`,
              `« Bon de commande » :  document qui indique les caractéristiques des Produits commandés par le Consommateur et qui doit être signé de lui par « double clic » pour l’engager.`,
              `« Commande » : acte par lequel le Consommateur s’engage à acheter des Produits ou Services et la Société Linarqa à les livrer.`
            ]
          }
        },
        {
          title : "Frais de services",
          context : {
            type : "paragraph",
            body : [
              `Vous reconnaissez et acceptez que lorsque vous réservez une Annonce, vous acceptez de payer tous les frais relatifs à votre réservation, y compris le prix du location du véhicule fixé dans l'Annonce, les frais applicables tels  que les frais de service Dweera.ma, les frais perçus en personne, les taxes et tout autre élément faisant partie du « Prix total ». Lorsque vous recevez la confirmation de réservation, un contrat/ Réservation est formé directement entre vous et l’annonceur/Utilisateur. Outre les présentes Conditions, vous serez soumis et responsable du respect de toutes les conditions de la Réservation, y compris, mais sans s'y limiter, les conditions d'annulation et tous les autres règlements, normes, politiques ou exigences identifiés dans l'Annonce ou lors du paiement qui s'appliquent à la Réservation. Il est de votre responsabilité de lire et de comprendre ces règlements, normes, politiques et exigences avant de réserver une Annonce.`
            ]
          }
        },
        {
          title : "Politique d’annulation et de remboursement:",
          context : {
            type : "list",
            body : [
              {
                subtitle : "",
                context : "",
                body : [
                  `En cas d'annulation par le vendeur avant la date de réservation: Si le vendeur annule une réservation avant l'arrivée, le consommateur/voyageur reçoit automatiquement un remboursement intégral.`,
                  `La politique d'annulation de Linarqa/Dweera.ma dépend du statut de la commande. Si la commande n'a toujours pas été acceptée par le vendeur, vous avez toujours la possibilité de demander l'annulation dans votre espace en ligne au niveau de la plateforme dweera. Si la commande a été déjà acceptée par le vendeur ou encore récupérée, vous n'êtes plus en mesure de l'annuler et vous serez facturés de la valeur totale de la commande.`,
                  `En cas d’un autre problème rencontré par le consommateur/client, nous acceptons les ventes fermes, au nom des vendeurs, mais (sauf si Linarqa est indiqué comme vendeur) Linarqa/dweera.ma n'est pas partie à la transaction entre le vendeur et l'acheteur.  Un contrat pour la vente et l'achat d'un ou de plusieurs services/produits entrera en vigueur entre l’acheteur et le vendeur, et en conséquence vous vous engagez à acheter ou à vendre le ou les services/produits concernés, dès la confirmation d'achat par l'acheteur via notre marketplace/plateforme.`,
                  `Une réservation est une licence limitée pour utiliser le véhicule.  L’annonceur/Utilisateur se réserve le droit de récupérer le véhicule pendant votre période de réservation, le cas échéant si cela est raisonnablement nécessaire, cela est autorisé en vertu de votre contrat avec l’annonceur/utilisateur, et cela est conforme au droit applicable. Si vous gardez le véhicule après l'heure de départ, l’annonceur/utilisateur a le droit de vous imposer des sanctions raisonnables pour utilisation indûment prolongée.`,
                  `Les annonceurs/utilisateurs et les voyageurs sont responsables de toute modification de réservation qu'ils acceptent d'apporter par le biais de la plateforme Dweera.ma et acceptent de payer tout montant, frais ou taxes supplémentaires associés à toute modification de réservation.`,
                  `Tous les produits présents dans le catalogue sont commercialisés jusqu'à épuisement des stocks.${"\n\n"}La société Linarqa se réserve le droit de retirer du catalogue un article, et ceci sans préavis, elle ne peut en aucun cas être tenu de dédommager ou d'annuler une commande suite à l'impossibilité d'utiliser le produit ou service acheté pour n’importe quelle raison.`,
                  `En cas d’erreur de votre part, au moment de votre saisie sur le bon de commande, nous vous conseillons de nous adresser dans les 24 h une demande d’annulation par e-mail ; Après annulation de la commande par Linarqa, vous pouvez commander à nouveau.`
                ]
              },
            ]
          }
        },
        {
          title : "Mode de paiement",
          context : {
            type : "list",
            body : [
              {
                subtitle : "",
                context : "",
                body : [
                  `Pour régler votre commande, vous choisissez le moyen de paiement parmi ceux proposés par notre plateforme c-à-d "Paiement cash à la livraison" ou  par “Paiement par carte bancaire”.${"\n\n"}Vos paiements Multicanaux sont sécurisés par le Centre Monétique Interbancaire (CMI) qui offre un service de paiement entièrement sécurisé.${"\n\n"}Le Consommateur garantit à la Société Linarqa qu’il dispose des autorisations éventuellement nécessaires pour utiliser le mode de paiement choisi par lui, lors de la validation du Bon de commande.${"\n\n"}En cas de paiement par carte bancaire, les dispositions relatives à l’utilisation frauduleuse du moyen de paiement prévues dans les conventions conclues entre le Consommateur et l’émetteur de la carte entre la Société Linarqa et son établissement bancaire s’appliquent.`,
                  `Preuve des transactions payés par carte bancaire :${"\n\n"}Les données enregistrées par le CMI sur la plate-forme de paiement Multi-canal pour le compte de Linarqa constituent la preuve de l’ensemble des transactions commerciales passées entre vous et la société Linarqa.`,
                  `Les produits/services doivent être de qualité adéquate et satisfaisante, adaptés et sûrs pour tout usage spécifié dans la liste des produits/services et toute autre description des produits/services fournie ou mise à disposition de l’acheteur par le vendeur, et être conformes à tous égards importants à cette liste.`,
                  `Les frais de livraison, les frais administratifs, les frais d'assurance, les autres frais et charges accessoires ne seront à la charge de l'acheteur que si cela est expressément et clairement indiqué dans la liste et le descriptif des produits/services concernés.`,
                  `Le prix de tout produit doit inclure toutes les taxes et être conforme aux lois applicables en vigueur de temps à autre.`,
                  `Force majeure :   Linarqa n’est tenu pour l’exécution de ses obligations que dans la mesure où aucun événement de force majeure ne vient les entraver.`
                ]
              },
            ]
          }
        },
        {
          title : "Rétractation",
          context : {
            type : "paragraph",
            body : [
              `En application de l'article 36 de la loi 31-08 édictant des mesures de protection du consommateur, le visiteur ayant souscrit une option de visibilité payante dispose d'un délai 7 jours pour se rétracter. Toutefois, en validant la commande, ledit visiteur accepte que Dweera.ma commence à exécuter la prestation et renonce expressément à son droit de rétractation.`
            ]
          }
        },
        {
          title : "Contact",
          context : {
            type : "paragraph",
            body : [
              `Pour toute réclamation ou demande d'information  : ${"\n\n"}Email : support@dweera${"\n"}Téléphone : +212667664899${"\n"}Adresse : 26 AV MERS SULTAN ETG 1 APPT 3 CASABLANCA${"\n"}RC : Linarqa`
            ]
          }
        }
    ])
  return (
    <>
    <div className="p-6 flex flex-col flex-wrap mx-auto items-center justify-center max-w-7xl w-full mt-5 h-full mb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Conditions Générales de Vente `}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-5xl mb-8 font-semibold text-gray-800 text-center">Conditions Générales de Vente</h1>
        </div>

        <div className="px-6">
          <div className="w-full mb-10">
            <h1 className="text-2xl font-semibold mb-2 text-gray-700">Sommaire :</h1>
            {conditions?.map((term, index) => (
              <h2 className="ml-6 text-lg font-semibold text-gray-500">
                {index + 1}. {term.title}
              </h2>))
            }
          </div>
          {conditions &&
            conditions?.map((term, index) => (
              <ul className="" key={index}>
                <section className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {index + 1}. {term.title}
                  </h3>
                  {
                    term?.context?.type === "list"
                      ? (
                        term?.context?.body?.map((_child, _i) =>
                          <>
                            <div className="px-2 flex flex-col gap-1 w-full pt-2">
                              <p className="text-lg text-gray-800">
                                {
                                  <>
                                  {
                                    _child?.body?.map((_item, ___i) => (
                                      <>
                                        {<h3 className="text-xl text-gray-700 font-semibold">
                                          {index + 1}.{___i + 1}.&nbsp; {_child?.subtitle || ''}
                                        </h3>}
                                        <h4 className=" ml-2 text-lg text-gray-700 font-semibold">
                                          {_child?.context || ""}
                                        </h4>
                                        <div className="px-2 flex flex-row gap-2 w-full pt-2">
                                          {
                                            _child?.context && ( 
                                              <h3 className="text-xl text-gray-700 font-semibold">
                                                {index + 1}.{_i + 1}.{___i + 1}
                                              </h3>
                                            )
                                          }
                                          <p className="text-lg text-gray-800 whitespace-pre-wrap">
                                            {_item}
                                          </p>
                                        </div>
                                      </>
                                    )
                                  )
                                  }
                                  </>
                                }
                              </p>
                            </div>
                          </>
                        )
                      )
                      : (
                        term?.context?.body?.map((_child, _i) =>
                          <>
                            <div className="px-2 flex flex-row gap-2 w-full pt-2">
                              {/*<h3 className="text-xl text-gray-700 font-semibold">
                                  {index + 1}.{_i + 1}.
                              </h3>*/}
                              <p className="text-lg text-gray-800 whitespace-pre-wrap">
                                {_child}
                              </p>
                            </div>
                          </>
                        )
                      )
                  }
                </section>
              </ul>
            ))}
        </div>
        {/*<div className="px-6 w-full">
            <ul className="flex flex-wrap gap-4 m-0 flex-row justify-center items-center w-full">
                <li className=' py-2'>
                    <a
                        href="mailto:support@dweera"
                        className=" hover:text-lime-600 hover:no-underline no-underline text-black font-bold text-sm px-2 py-2 bg-gray-100 rounded-lg"
                    >
                        support@dweera
                    </a>
                </li>
                <li className=' py-2'>
                    <a
                        href="tel:+212667664899"
                        className="hover:text-lime-600 hover:no-underline no-underline text-black font-bold text-sm px-2 py-2 bg-gray-100 rounded-lg"
                    >
                        +212667664899
                    </a>
                </li>
                <li className='py-2'>
                    <span
                        className="hover:text-lime-600 break-words flex justify-center items-center h-fit overflow-hidden cursor-pointer hover:no-underline no-underline text-black font-bold bg-gray-100 text-sm px-2 py-2 text-center rounded-lg"
                    >
                        26 AV MERS SULTAN ETG 1 APPT 3 CASABLANCA
                    </span>
                </li>
                <li className=' py-2'>
                    <span
                        className="hover:text-lime-600 hover:no-underline no-underline cursor-pointer text-black font-bold text-sm px-2 py-2 bg-gray-100 rounded-lg"
                    >
                        RC : Linarqa
                    </span>
                </li>
            </ul>
        </div>*/}
      </div>
    </div>
    </>
  )
}
