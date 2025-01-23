import "./TruckAnimation.scss"

export default function TruckAnimation() {
  return (
    <div className="header-top">
    <div className="header-wrapper">
      <div className="header-truckarea">
        <img
          className="header-truckarea-image truck-img"
          src="https://cdn.santral.az//src/header/truck.png"
          alt="truck"
        />
        <img
          className="header-truckarea-image box-img box-img1"
          src="https://cdn.santral.az//src/header/box.png"
          alt="box"
        />
        <img
          className="header-truckarea-image box-img box-img2"
          src="https://cdn.santral.az//src/header/box.png"
          alt="box"
        />
      </div> 
      <span className="content">50₼ və üstü pulsuz catdirilma</span>
    </div>
  </div>
  )
}
