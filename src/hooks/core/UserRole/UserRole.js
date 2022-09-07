import React, { useState, useEffect } from 'react';

const ADMIN = '000';
const DIRECTOR = '001';
const EMPLOYEE = '002';

function useUserRole(props)
{
    return [{
        'admin': ADMIN,
        'director': DIRECTOR,
        'employee': EMPLOYEE
    }];
     
}

export default useUserRole;