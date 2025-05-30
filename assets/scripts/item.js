//clase objeto que se puede coger en el mapa y puede tener distintos usos
export default class Item extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, frame, player, isUsable) {
        super(world, x, y, 'items', frame);

        this.threshold = 15; //separacion entre el tooltip del item y el propio item
        //tooltip que muestra con que boton se puede coger el item
        this.itemPointer = this.scene.add.sprite(x, y - this.threshold,
            'itemTooltip').setVisible(true).setDepth(11).setScale(0.8);

        this.setBody({
            type: 'rectangle',
            width: 30,
            height: 30         
        });  

        this.scene.add.existing(this); //se añade a la escena
        this.scene.matter.add.sprite(this); //se añade a matter
        this.setStatic(true); //los items no se mueven
        this.setSensor(true); //son sensores para funcionar como triggers

        //al poner el cursor encima del item se muestra su descripcion por pantalla
        this.on('pointerover', () => {
            this.scene.gui.setInfoText(this.name + ": " + this.description);
        });

        //al sacar el cursor fuera del item se borra su descripcion por pantalla
        this.on('pointerout', () => {
            this.scene.gui.setInfoText("");
        });

        //si son consumibles
        if(isUsable){
            this.on('pointerdown', () => {
                //se hace su efecto
                this.doSomething(player);
                //se borra del inventario
                player.inventory.removeObject(this);
            });
        }
    }
}

//#region UsableItems (isUsable=true)
export class PotionItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Pocion";
        this.description = "Recupera cordura";
    }

    doSomething(player) {
        player.sanity += 30;
        if(player.sanity > 100) player.sanity = 100;
    }
}


export class KaleidoscopeItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Caleidoscopio";
        this.description = "Reduce el gasto de cordura con la venda quitada";
    }

    doSomething(player) {
        //aumento el tiempo que tarda en disminuir la cordura
        player.decay = 0.05;
    }
}

export class StampItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Estampita";
        this.description = "Aumenta la fe";
    }

    doSomething(player) {
        player.addFaith(10);
    }
}

export class PendantItem extends Item {
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Colgante";
        this.description = "Aumenta la fe";
    }

    doSomething(player) {
        player.addFaith(60);
        this.scene.changeTooltips();
    }
}

export class BlessingItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Bendición";
        this.description = "Aumenta bastante la fe";
    }

    doSomething(player) {
        player.addFaith(30);
    }
}

export class BetterBlindFoldItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Venda de tela";
        this.description = "Una venda de mejor calidad que aumenta la cordura máxima";
    }

    doSomething(player) {
        player.setMaxSanity(player.maxSanity+30);
    }
}

export class SacredFireItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Fuego sagrado";
        this.description = "Tu cordura maxima disminuye, pero aumenta bastante tu fe";
        this.itemPointer.setVisible(false);
        this.setDepth(-1);
    }

    doSomething(player) {
        player.setMaxSanity(player.maxSanity - 30);
        player.addFaith(40);
    }
}

export class LessDeathItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, true);
        this.name = "Láudano";
        this.description = "Al usarse es menos probable morir";
    }

    doSomething(player) {
        player.deathProbability = 0.7;
    }
}
//#endregion

//#region KeyItems (isUsable=false)
export class AvoidDeathItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Figura tallada";
        this.description = "Un recuerdo de alguien muy importante. Te ayudará en momentos de necesidad";
    }
}

export class SketchItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Boceto";
        this.description = "Un boceto abstracto con una gama de colores cálidos";
    }
}

export class CaneItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Baston";
        this.description = "Parece pertenecer a alguien";
    }
}

export class BoozeItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Botella";
        this.description = "Parece habersele caido a alguien en medio de beberlo";
    }
}

export class EmptyBucketItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Cubo vacio";
        this.description = "No tiene nada dentro";
    }
}

export class BucketItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Cubo con agua";
        this.description = "Parece tener agua dentro";
    }
}

export class FlowerItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Flor";
        this.description = "Recien cortada de los pastos";
    }
}

export class FoodItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Comida";
        this.description = "Te entra mucha hambre al verl... olerlo";
    }
}

export class GlassesItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Gafas";
        this.description = "Seguro que le pertenece a alguien";
    }
}

export class MoneyBagItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Bolsa con monedas";
        this.description = "Al vendedor le encantará";
    }
}

export class PictureItem extends Item{
    constructor(world, x, y, frame, player){
        super(world, x, y, frame, player, false);
        this.name = "Foto";
        this.description = "Recuerdo de un viaje";
    }
}
//#endregion