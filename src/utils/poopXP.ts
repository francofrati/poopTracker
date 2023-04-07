export const getLevel = (xp: number) => {
    if (xp < 500) {
        return {
            name: 'NOVATO',
            level: 0
        }
    }
    if (xp >= 500 && xp < 1000) {
        return {
            name: 'PRINCIPIANTE',
            level: 1
        }
    }
    if (xp >= 1000 && xp < 1500) {
        return {
            name: 'AMATEUR',
            level: 2
        }
    }
    if (xp >= 1500 && xp < 2000) {
        return {
            name: 'PROFESIONAL',
            level: 3
        }
    }
    if (xp >= 2000 && xp < 2500) {
        return {
            name: 'EXPERTO',
            level: 4
        }
    }
    if (xp >= 2500 && xp < 3000) {
        return {
            name: 'PLOMERO AMATEUR',
            level: 5
        }
    }
    if (xp >= 3000 && xp < 3500) {
        return {
            name: 'PLOMERO CERTIFICADO',
            level: 6
        }
    }
    if (xp >= 3500 && xp < 4000) {
        return {
            name: 'MAESTRO',
            level: 7
        }
    }
    if (xp >= 4000 && xp < 4500) {
        return {
            name: 'LEYENDA',
            level: 8
        }
    }
    if (xp >= 5400 && xp < 5000) {
        return {
            name: 'GRAN MAESTRO',
            level: 9
        }
    }
    if (xp >= 5000 && xp < 5500) {
        return {
            name: 'TITAN DEL CAOS',
            level: 10
        }
    }
    if (xp >= 5500 && xp < 6000) {
        return {
            name: 'LEGENDARIO',
            level: 11
        }
    }
    if (xp >= 6000 && xp < 6500) {
        return {
            name: 'MITICO',
            level: 12
        }
    }
    if (xp >= 6500 && xp < 7000) {
        return {
            name: 'SER SUPREMO',
            level: 13
        }
    }
    if (xp >= 7000 && xp < 7500) {
        return {
            name: 'SER CELESTIAL',
            level: 14
        }
    }
    if (xp >= 7500 && xp < 8000) {
        return {
            name: 'ANO INMORTAL',
            level: 15
        }
    }
    if (xp >= 8000) {
        return {
            name: 'NIVEL GOD',
            level: 16
        }
    }

}