# nodeHackathon

GET / POST / PUT / DELETE :

/answers

    {
        id,
        content,
        id_parent,
        id_user,
        type_parent
    }

/classe

    {
        id,
        promo,
        years,
        speciality,
    }

 /exercises

         {
             id,
             content,
             description,
             title,
             link,
             favorite,
             id_lesson,
             id_user
         }

/lesson

    {
        id,
        libelle,
        description,
        title,
        id_parent,
        id_user,
        type_parent
    }

/questions

    {
        id,
        id_lesson,
        is_user,
        title,
        libelle,
        favorite
    }

/subjects

    {
        id,
        libelle,
        id_user
    }

/videos

    {
        id,
        description,
        favorite,
        id_user,
        link,
        title
    }


GET

/users
/classes