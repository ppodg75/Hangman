package dto;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PlayerDto implements Serializable {
	
	private static final long serialVersionUID = 7526471155622776147L;
	
	private String name = "";
	private long points = 0;
	private long countWins = 0;
	private long countLosts = 0;
	private String status;
	
	public PlayerDto() { }
	
	public PlayerDto(String name, long points, long countWins, long countLosts,  String status) {
		this.name=name;
		this.points=points;
		this.countWins=countWins;
		this.countLosts=countLosts;
		this.status = status;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getPoints() {
		return points;
	}
	public void setPoints(long points) {
		this.points = points;
	}
	public long getCountWins() {
		return countWins;
	}
	public void setCountWins(long countWins) {
		this.countWins = countWins;
	}
	public long getCountLosts() {
		return countLosts;
	}
	public void setCountLosts(long countLosts) {
		this.countLosts = countLosts;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
