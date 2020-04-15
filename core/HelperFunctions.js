exports.SplitAString = function(stringToSplit) {
  var arr = stringToSplit.split(",");
  var result = arr.splice(0, 2);

  result.push(arr.join(" "));

  return result;
};

exports.CleanPlayerName = function(player) {
  const splitInfo = this.SplitAString(player);
  const playerName = splitInfo[2];

  return playerName;
};

exports.friendlyClass = function(ufClass) {
  switch (ufClass) {
    //DmgTypes
    case "Rx_DmgType_RemoteC4":
      return "Remote C4";
    case "DmgType_Suicided":
      return "Suicide";
    case "Rx_DmgType_A10_Missile":
      return "%gdi%A10 Missile";
    case "Rx_DmgType_AATower":
      return "%gdi%Anti-Air Tower";
    case "Rx_DmgType_AGT_MG":
      return "%gdi%AGT Machine Guns";
    case "Rx_DmgType_AGT_Rocket":
      return "%gdi%AGT Rockets";
    case "Rx_DmgType_APC":
      return "APC";
    case "Rx_DmgType_APC_GDI":
      return "%gdi%GDI APC";
    case "Rx_DmgType_APC_Nod":
      return "%nod%Nod APC";
    case "Rx_DmgType_ATMine":
      return "Anti-Tank Mine";
    case "Rx_DmgType_Abduction":
      return "Abducted";
    case "Rx_DmgType_Apache_Gun":
    case "Rx_DmgType_Apache_Passenger":
    case "Rx_DmgType_Apache_Rocket":
      return "%nod%Apache";
    case "Rx_DmgType_Artillery":
      return "%nod%Mobile Artillery";
    case "Rx_DmgType_AutoRifle":
      return "Auto Rifle";
    case "Rx_DmgType_BarbedWire":
      return "Barbed Wire";
    case "Rx_DmgType_Buggy":
      return "%nod%Buggy";
    case "Rx_DmgType_Bullet":
      return "Bullet";
    case "Rx_DmgType_Burn":
      return "Burn";
    case "Rx_DmgType_BurnC4":
      return "C4 Burn";
    case "Rx_DmgType_Carbine":
      return "Carbine";
    case "Rx_DmgType_ChainGun":
      return "Chain Gun";
    case "Rx_DmgType_ChemicalThrower":
      return "Chemical Sprayer";
    case "Rx_DmgType_Chinook":
      return "Chinook";
    case "Rx_DmgType_Chinook_GDI":
      return "%gdi%GDI Chinook";
    case "Rx_DmgType_Chinook_Nod":
      return "%nod%Nod Chinook";
    case "Rx_DmgType_CruiseMissile":
      return "Cruise Missile";
    case "Rx_DmgType_Drowned":
      return "Drowned";
    case "Rx_DmgType_EMP":
      return "EMP";
    case "Rx_DmgType_EMPGrenade":
      return "EMP Grenade";
    case "DmgType_Explosive":
      return "Explosive";
    case "Rx_DmgType_Fell":
      return "Fell";
    case "Rx_DmgType_FireBleed":
      return "Fire";
    case "Rx_DmgType_FlakCannon":
      return "Flak Cannon";
    case "Rx_DmgType_FlakCannon_Alt":
      return "Flak Cannon Alternate Fire";
    case "Rx_DmgType_FlameTank":
      return "%nod%Flame Tank";
    case "Rx_DmgType_FlameThrower":
      return "Flame Thrower";
    case "Rx_DmgType_Grenade":
      return "Grenade";
    case "Rx_DmgType_GrenadeLauncher":
      return "Grenade Launcher";
    case "Rx_DmgType_GuardTower":
      return "Guard Tower";
    case "Rx_DmgType_GunEmpl":
      return "Gun Emplacement";
    case "Rx_DmgType_GunEmpl_Alt":
      return "Gun Emplacement Alternate Fire";
    case "Rx_DmgType_Headshot":
      return "Headshot";
    case "Rx_DmgType_HeavyPistol":
      return "Heavy Pistol";
    case "Rx_DmgType_HoverCraft_Cannon":
      return "%gdi%Hovercraft";
    case "Rx_DmgType_HoverCraft_Rockets":
      return "%gdi%Hovercraft";
    case "Rx_DmgType_Humvee":
      return "%gdi%Humvee";
    case "Rx_DmgType_IonCannon":
      return "Ion Cannon";
    case "Rx_DmgType_LaserChainGun":
      return "Laser Chain Gun";
    case "Rx_DmgType_LaserRifle":
      return "Laser Rifle";
    case "Rx_DmgType_LightTank":
      return "%nod%Light Tank";
    case "Rx_DmgType_M2Bradley":
      return "%nod%M2 Bradley";
    case "Rx_DmgType_M2Bradley_Rocket":
      return "%nod%M2 Bradley";
    case "Rx_DmgType_MRLS":
      return "%gdi%MRLS";
    case "Rx_DmgType_MammothTank_Cannon":
    case "Rx_DmgType_MammothTank_Missile":
      return "%gdi%Mammoth Tank";
    case "Rx_DmgType_MarksmanRifle":
      return "Marksman Rifle";
    case "Rx_DmgType_MediumTank":
      return "%gdi%Medium Tank/105mm Cannon";
    case "Rx_DmgType_MissileLauncher":
      return "Missile Launcher";
    case "Rx_DmgType_MissileLauncher_Alt":
      return "Missile Launcher Alternate Fire";
    case "Rx_DmgType_Nuke":
      return "Nuclear Strike";
    case "Rx_DmgType_Obelisk":
      return "Obelisk Laser";
    case "Rx_DmgType_Orca_Gun":
    case "Rx_DmgType_Orca_Missile":
    case "Rx_DmgType_Orca_Passenger":
      return "%gdi%Orca";
    case "Rx_DmgType_Pancake":
      return "Pancake";
    case "Rx_DmgType_PersonalIonCannon":
      return "Personal Ion Cannon";
    case "Rx_DmgType_Pistol":
      return "Pistol";
    case "Rx_DmgType_ProxyC4":
      return "Proximity C4";
    case "Rx_DmgType_Railgun":
      return "Railgun";
    case "Rx_DmgType_RamjetRifle":
      return "Ramjet Rifle";
    case "Rx_DmgType_RanOver":
      return "Ran Over";
    case "Rx_DmgType_Rocket":
      return "Rocket";
    case "Rx_DmgType_RocketEmpl_Missile":
      return "Rocket Emplacement Missile";
    case "Rx_DmgType_RocketEmpl_Swarm":
      return "Rocket Emplacement Swarm";
    case "Rx_DmgType_RocketLauncher":
      return "Rocket Launcher";
    case "Rx_DmgType_SAMSite":
      return "SAM Site";
    case "Rx_DmgType_SMG":
      return "SMG";
    case "Rx_DmgType_Shell":
      return "Shell";
    case "Rx_DmgType_Shotgun":
      return "Shotgun";
    case "Rx_DmgType_SniperRifle":
      return "Sniper Rifle";
    case "Rx_DmgType_Special":
      return "Special";
    case "Rx_DmgType_StealthTank":
      return "Stealth Tank/TOW Missiles";
    case "Rx_DmgType_TacticalRifle":
      return "Tactical Rifle";
    case "Rx_DmgType_TacticalRifleGrenade":
      return "Tactical Rifle Grenade";
    case "Rx_DmgType_Tiberium":
      return "Tiberium";
    case "Rx_DmgType_TiberiumAutoRifle":
      return "Tiberium Auto Rifle";
    case "Rx_DmgType_TiberiumAutoRifle_Blue":
      return "Blue Tiberium Auto Rifle";
    case "Rx_DmgType_TiberiumAutoRifle_Flechette_Blue":
      return "Blue Tiberium Auto Rifle";
    case "Rx_DmgType_TiberiumBleed":
      return "Tiberium Decay";
    case "Rx_DmgType_TimedC4":
      return "Timed C4";
    case "Rx_DmgType_Turret":
      return "Turret";
    case "Rx_DmgType_VehicleMG":
      return "Vehicle MG";
    case "Rx_DmgType_VoltAutoRifle":
      return "Volt Auto Rifle";
    case "Rx_DmgType_VoltRifle_Alt":
      return "Volt Auto Rifle";


      //Vehicles
    case "Rx_Vehicle_MediumTank":
      return "%gdi%Medium Tank";
    case "Rx_Vehicle_A10":
      return "%gdi%A10";
    case "Rx_Vehicle_AC130":
      return "%nod%AC130";
    case "Rx_Vehicle_APC_GDI":
      return "%gdi%APC";
    case "Rx_Vehicle_APC_Nod":
      return "%nod%APC";
    case "Rx_Vehicle_Apache":
      return "%nod%Apache";
    case "Rx_Vehicle_Artillery":
      return "%nod%Mobile Artillery";
    case "Rx_Vehicle_Buggy":
      return "%nod%Buggy";
    case "Rx_Vehicle_Bus":
      return "Bus";
    case "Rx_Vehicle_C130":
      return "%nod%C130";
    case "Rx_Vehicle_FlameTank":
      return "%nod%Flame Tank";
    case "Rx_Vehicle_Harvester_GDI":
      return "%gdi%Harvester";
    case "Rx_Vehicle_Harvester_Nod":
      return "%nod%Harvester";
    case "Rx_Vehicle_Hovercraft":
      return "%gdi%Hovercraft";
    case "Rx_Vehicle_Humvee":
      return "%gdi%Humvee";
    case "Rx_Vehicle_LightTank":
      return "%nod%Light Tank";
    case "Rx_Vehicle_M2Bradley":
      return "%nod%M2 Bradley";
    case "Rx_Vehicle_MRLS":
      return "%gdi%MRLS";
    case "Rx_Vehicle_MammothTank":
      return "%gdi%Mammoth Tank";
    case "Rx_Vehicle_Mig35":
      return "%nod%Mig35";
    case "Rx_Vehicle_Orca":
      return "%gdi%Orca";
    case "Rx_Vehicle_StealthTank":
      return "%nod%Stealth Tank";

      //Buildings
    case "Rx_Building_Refinery_Nod":
    case "Rx_Building_Refinery_Nod_Ramp":
      return "%nod%Refinery";
    case "Rx_Building_PowerPlant_Nod":
    case "Rx_Building_PowerPlant_Nod_Ramps":
      return "%nod%Power Plant";
    case "Rx_Building_HandOfNod":
    case "Rx_Building_HandOfNod_Ramps":
      return "%nod%Hand of Nod";
    case "Rx_Building_AirStrip_Ramps":
    case "Rx_Building_AirStrip":
      return "%nod%Airstrip";
    case "Rx_Building_PowerPlant_GDI":
    case "Rx_Building_PowerPlant_GDI_Ramps":
      return "%gdi%GDI Power Plant";
    case "Rx_Building_WeaponsFactory":
    case "Rx_Building_WeaponsFactory_Ramps":
      return "%gdi%Weapons Factory";
    case "Rx_Building_Refinery_GDI":
    case "Rx_Building_Refinery_GDI_Ramps":
      return "%gdi%GDI Refinery";
    case "Rx_Building_RepairFacility_Nod":
      return "%nod%Repair Pad";
    case "Rx_Building_RepairFacility_GDI":
      return "%gdi%GDI Repair Pad";
    case "Rx_Building_AdvancedGuardTower":
      return "%gdi%Adv. Guard Tower";
    case "Rx_Building_Obelisk":
      return "%nod%Obelisk of Light";
    case "Rx_Building_Barracks":
      return "%gdi%Barracks";

      //Tech buildings
    case "Rx_TechBuilding":
      return "Tech Building";

      //FamilyInfo

      //GDI
    case "Rx_FamilyInfo_GDI_Engineer":
      return "%gdi%Engineer";
    case "Rx_FamilyInfo_GDI_Grenadier":
      return "%gdi%Grenadier";
    case "Rx_FamilyInfo_GDI_Gunner":
      return "%gdi%Gunner";
    case "Rx_FamilyInfo_GDI_Havoc":
      return "%gdi%Havoc";
    case "Rx_FamilyInfo_GDI_Hotwire":
      return "%gdi%Hotwire";
    case "Rx_FamilyInfo_GDI_Marksman":
      return "%gdi%Marksman";
    case "Rx_FamilyInfo_GDI_McFarland":
      return "%gdi%McFarland";
    case "Rx_FamilyInfo_GDI_Mobius":
      return "%gdi%Mobius";
    case "Rx_FamilyInfo_GDI_Officer":
      return "%gdi%Officer";
    case "Rx_FamilyInfo_GDI_Patch":
      return "%gdi%Patch";
    case "Rx_FamilyInfo_GDI_RocketSoldier":
      return "%gdi%Rocket Soldier";
    case "Rx_FamilyInfo_GDI_Shotgunner":
      return "%gdi%Shotgunner";
    case "Rx_FamilyInfo_GDI_Soldier":
      return "%gdi%Soldier";
    case "Rx_FamilyInfo_GDI_Sydney":
      return "%gdi%Sydney";

      //Nod
    case "Rx_FamilyInfo_Nod_BlackHandSniper":
      return "%nod%Black Hand Sniper";
    case "Rx_FamilyInfo_Nod_ChemicalTrooper":
    
      return "%nod%Chem. Trooper";
    case "Rx_FamilyInfo_Nod_Engineer":
      return "%nod%Engineer";
    case "Rx_FamilyInfo_Nod_FlameTrooper":
      return "%nod%Flame Trooper";
    case "Rx_FamilyInfo_Nod_LaserChainGunner":
      return "%nod%Laser Chain Gunner";
    case "Rx_FamilyInfo_Nod_Marksman":
      return "%nod%Marksman";
    case "Rx_FamilyInfo_Nod_Mendoza":
      return "%nod%Mendoza";
    case "Rx_FamilyInfo_Nod_Officer":
      return "%nod% Officer";
    case "Rx_FamilyInfo_Nod_Raveshaw":
      return "%nod%Raveshaw";
    case "Rx_FamilyInfo_Nod_RocketSoldier":
      return "%nod% Rocket Soldier";
    case "Rx_FamilyInfo_Nod_Sakura":
      return "%nod%Sakura";
    case "Rx_FamilyInfo_Nod_Shotgunner":
      return "%nod%Shotgunner";
    case "Rx_FamilyInfo_Nod_Soldier":
      return "%nod%Soldier";
    case "Rx_FamilyInfo_Nod_Technician":
      return "%nod%Technician";
    case "Rx_FamilyInfo_Nod_StealthBlackHand":
      return "%nod%Stealth Black Hand";

      //Defences
    case "Rx_Defence_Turret":
      return "%nod%Turret";

    default:
      return ufClass;
  }
};